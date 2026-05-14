"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  UploadCloud
} from "lucide-react";

type UploadStatus = "idle" | "processing" | "success" | "error";

const INVALID_FILE_MESSAGE = "Arquivo inválido. O padrão recomendado é .ofx.";

function buildFallbackDownloadName(fileName: string): string {
  const baseName = fileName.replace(/\.ofx$/i, "");
  return `${baseName || "extrato"}-formatado.ofx`;
}

function extractFileName(contentDisposition: string | null): string | null {
  if (!contentDisposition) {
    return null;
  }

  const encodedMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (encodedMatch?.[1]) {
    return decodeURIComponent(encodedMatch[1].replace(/"/g, ""));
  }

  const fallbackMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
  return fallbackMatch?.[1] ?? null;
}

export function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFileName, setDownloadFileName] = useState("extrato-formatado.ofx");

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  function resetDownload() {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    setDownloadUrl(null);
  }

  async function processFile(file: File) {
    resetDownload();
    setStatus("processing");
    setMessage("Processando extrato...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/formatar", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        let errorMessage = "Não foi possível processar o arquivo.";

        try {
          const data = (await response.json()) as { error?: string };
          if (data.error) {
            errorMessage = data.error;
          }
        } catch {
          // Keep the generic error if the response is not JSON.
        }

        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const fileName =
        extractFileName(response.headers.get("Content-Disposition")) ??
        buildFallbackDownloadName(file.name);

      setDownloadUrl(objectUrl);
      setDownloadFileName(fileName);
      setStatus("success");
      setMessage("Arquivo processado com sucesso.");
    } catch (error) {
      resetDownload();
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Não foi possível processar o arquivo."
      );
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setSelectedFileName(file.name);

    if (!file.name.toLowerCase().endsWith(".ofx")) {
      resetDownload();
      setStatus("error");
      setMessage(INVALID_FILE_MESSAGE);
      return;
    }

    await processFile(file);
  }

  const isProcessing = status === "processing";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      <input
        ref={inputRef}
        accept=".ofx"
        aria-label="Selecionar Extrato Caixa"
        className="sr-only"
        disabled={isProcessing}
        onChange={handleFileChange}
        type="file"
      />

      <div className="mb-6">
        <div className="grid h-14 w-14 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue">
          <UploadCloud aria-hidden className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-brand-blue">
          Enviar extrato
        </h2>
      </div>

      <button
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-blue px-4 py-3 text-base font-semibold text-white transition hover:bg-[#24435f] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isProcessing}
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        {isProcessing ? (
          <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
        ) : (
          <UploadCloud aria-hidden className="h-5 w-5" />
        )}
        Selecionar Extrato Caixa
      </button>

      {selectedFileName ? (
        <div className="mt-4 flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-brand-gray">
          <FileText aria-hidden className="h-5 w-5 shrink-0 text-brand-blue" />
          <span className="truncate">{selectedFileName}</span>
        </div>
      ) : null}

      {message ? (
        <div
          className={[
            "mt-4 flex items-start gap-3 rounded-md px-3 py-3 text-sm",
            isSuccess
              ? "bg-brand-green/10 text-[#1f7d35]"
              : isError
                ? "bg-red-50 text-red-700"
                : "bg-slate-50 text-brand-gray"
          ].join(" ")}
          role={isError ? "alert" : "status"}
        >
          {isSuccess ? (
            <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
          ) : isError ? (
            <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <Loader2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 animate-spin" />
          )}
          <span>{message}</span>
        </div>
      ) : null}

      {downloadUrl ? (
        <a
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-green px-4 py-3 text-base font-semibold text-white transition hover:bg-[#218838]"
          download={downloadFileName}
          href={downloadUrl}
        >
          <Download aria-hidden className="h-5 w-5" />
          Baixar extrato formatado
        </a>
      ) : null}
    </section>
  );
}
