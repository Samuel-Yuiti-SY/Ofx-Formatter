import { formatOfxContent } from "@/lib/formatar-ofx";

export const runtime = "nodejs";

const INVALID_FILE_MESSAGE = "Arquivo inválido. O padrão recomendado é .ofx.";
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function buildDownloadFileName(originalName: string): string {
  const baseName = originalName
    .replace(/\.ofx$/i, "")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${baseName || "extrato"}-formatado.ofx`;
}

function contentDisposition(fileName: string): string {
  const fallbackName = fileName.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");

  return `attachment; filename="${fallbackName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const entry = formData.get("file");

    if (!entry || typeof entry === "string") {
      return jsonError("Nenhum arquivo foi enviado.", 400);
    }

    if (!entry.name.toLowerCase().endsWith(".ofx")) {
      return jsonError(INVALID_FILE_MESSAGE, 400);
    }

    if (entry.size > MAX_FILE_SIZE_BYTES) {
      return jsonError("O arquivo excede o limite de 8 MB.", 413);
    }

    const originalContent = await entry.text();
    const formattedContent = formatOfxContent(originalContent);
    const downloadName = buildDownloadFileName(entry.name);

    return new Response(formattedContent, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": contentDisposition(downloadName),
        "Content-Type": "application/x-ofx; charset=utf-8"
      }
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível processar o arquivo.";

    return jsonError(message, 400);
  }
}
