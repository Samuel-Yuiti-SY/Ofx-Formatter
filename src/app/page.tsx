import { FileText, LockKeyhole, UserRound } from "lucide-react";
import { UploadForm } from "@/components/upload-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-blue text-white">
              <UserRound aria-hidden className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-brand-blue">Samuel Yuiti</p>
              <p className="text-xs font-medium uppercase tracking-wide text-brand-gray">
                Formatador OFX
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[1fr_440px] lg:py-16">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-brand-blue/15 bg-white px-3 py-2 text-sm font-medium text-brand-blue shadow-sm">
            <FileText aria-hidden className="h-4 w-4" />
            Correção de arquivos OFX
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-brand-blue sm:text-5xl">
            Formatador de Extrato Caixa
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-brand-gray">
            Envie seu arquivo OFX e baixe o extrato corrigido em poucos segundos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-brand-gray">
            <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
              <LockKeyhole aria-hidden className="h-4 w-4 text-brand-green" />
              Processamento sem armazenamento permanente
            </span>
          </div>
        </div>

        <UploadForm />
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-brand-gray sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Site criado por: Samuel Yuiti</p>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <a className="text-brand-blue hover:text-brand-green" href="mailto:samuelyuit@gmail.com">
              samuelyuit@gmail.com
            </a>
            <a
              className="text-brand-blue hover:text-brand-green"
              href="https://www.linkedin.com/in/samuelyuiti/"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
