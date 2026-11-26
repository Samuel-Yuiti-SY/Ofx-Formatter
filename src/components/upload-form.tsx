"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  UploadCloud,
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
    try {
      return decodeURIComponent(encodedMatch[1].replace(/"/g, ""));
    } catch {
      return null;
    }
  }

  const fallbackMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
  return fallbackMatch?.[1] ?? null;
}

export function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const processingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFileName, setDownloadFileName] = useState(
    "extrato-formatado.ofx",
  );

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
        body: formData,
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
        error instanceof Error
          ? error.message
          : "Não foi possível processar o arquivo.",
      );
    } finally {
      processingRef.current = false;
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    await selectFile(file);
  }

  async function selectFile(file: File) {
    if (processingRef.current) return;
    setSelectedFileName(file.name);
    const error = !file.name.toLowerCase().endsWith(".ofx")
      ? INVALID_FILE_MESSAGE
      : file.size > 8 * 1024 * 1024
        ? "O arquivo excede o limite de 8 MB."
        : null;
    if (error) {
      resetDownload();
      setStatus("error");
      setMessage(error);
      return;
    }
    processingRef.current = true;
    await processFile(file);
  }

  async function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) await selectFile(file);
  }

  const isProcessing = status === "processing";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <section
      className="upload-panel"
      aria-labelledby="upload-title"
      aria-busy={isProcessing}
    >
      <input
        ref={inputRef}
        accept=".ofx"
        aria-label="Selecionar arquivo OFX"
        className="sr-only"
        tabIndex={-1}
        disabled={isProcessing}
        onChange={handleFileChange}
        type="file"
      />
      <div className="upload-heading">
        <h2 id="upload-title">Corrigir meu extrato</h2>
        <span className="file-type">.OFX</span>
      </div>
      <div
        className={`dropzone${isDragging ? " is-dragging" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          if (!isProcessing) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <UploadCloud
          aria-hidden
          className="upload-icon"
          size={36}
          strokeWidth={1.3}
        />
        <strong>
          {isDragging ? "Solte o arquivo aqui" : "Arraste seu extrato para cá"}
        </strong>
        <p>
          ou selecione um arquivo do dispositivo
          <br />
          Formato .ofx · até 8 MB
        </p>
      </div>
      <button
        className="upload-button"
        disabled={isProcessing}
        onClick={() => inputRef.current?.click()}
        type="button"
        aria-describedby="upload-help"
      >
        {isProcessing ? (
          <Loader2 aria-hidden className="animate-spin" size={18} />
        ) : (
          <FileText aria-hidden size={18} />
        )}
        {isProcessing
          ? "Corrigindo extrato…"
          : isSuccess
            ? "Selecionar outro extrato"
            : "Selecionar arquivo OFX"}
      </button>
      <p id="upload-help" className="upload-caption">
        O processamento começa ao selecionar o arquivo. Seu extrato original
        permanece no dispositivo.
      </p>
      {selectedFileName && (
        <div className="selected-file">
          <FileText aria-hidden size={18} className="shrink-0" />
          <span>{selectedFileName}</span>
        </div>
      )}
      <div aria-live="polite" aria-atomic="true">
        {message && (
          <div
            className={`feedback ${isSuccess ? "success" : isError ? "error" : ""}`}
            role={isError ? "alert" : "status"}
          >
            {isSuccess ? (
              <CheckCircle2 aria-hidden size={18} />
            ) : isError ? (
              <AlertCircle aria-hidden size={18} />
            ) : (
              <Loader2 aria-hidden size={18} className="animate-spin" />
            )}
            <span>{message}</span>
          </div>
        )}
      </div>
      {downloadUrl && (
        <a
          className="download-button"
          download={downloadFileName}
          href={downloadUrl}
        >
          <Download aria-hidden size={18} />
          Baixar extrato formatado
        </a>
      )}
    </section>
  );
}
