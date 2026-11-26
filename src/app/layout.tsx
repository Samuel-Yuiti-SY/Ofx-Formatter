import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Formatador de Extrato Caixa | Samuel Yuiti",
  description:
    "Corrija a estrutura de extratos OFX da Caixa: fechamento de tags, datas e fuso horário. Envie o arquivo e baixe uma nova cópia.",
  metadataBase: new URL("https://site-extratos-ofx.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Formatador OFX | Extratos Caixa",
    description:
      "Correção de estrutura de arquivos OFX, sem armazenamento permanente.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
