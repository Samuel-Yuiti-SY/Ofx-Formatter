import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Formatador de Extrato Caixa | Samuel Yuiti",
  description: "Ferramenta para corrigir e formatar extratos bancários no formato OFX."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
