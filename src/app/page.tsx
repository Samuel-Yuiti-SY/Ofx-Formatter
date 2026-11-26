import { ArrowDown, FileCheck2, FileText, LockKeyhole } from "lucide-react";
import { UploadForm } from "@/components/upload-form";

const steps = [
  ["01", "Selecione o extrato", "Use o arquivo .ofx exportado pelo banco."],
  [
    "02",
    "Aguarde a correção",
    "A ferramenta ajusta tags, datas e a estrutura do arquivo.",
  ],
  [
    "03",
    "Baixe e confira",
    "Salve uma nova cópia e confira os dados antes de importar.",
  ],
];

export default function Home() {
  return (
    <div className="ofx-app">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="site-header">
        <div className="page-width header-inner">
          <a href="/" className="wordmark" aria-label="Formatador OFX, início">
            <FileText aria-hidden size={26} />
            <span>
              OFX<span className="wordmark-divider">/</span>
              <span className="wordmark-light">formatador</span>
            </span>
          </a>
          <a className="header-link" href="#como-funciona">
            Como funciona <ArrowDown aria-hidden size={15} />
          </a>
        </div>
      </header>
      <main id="conteudo" className="page-width workspace">
        <section className="intro" aria-labelledby="titulo">
          <p className="eyebrow">EXTRATOS CAIXA · ARQUIVOS OFX</p>
          <h1 id="titulo">
            Formatador de <span>extratos OFX</span>
          </h1>
          <p className="intro-copy">
            Corrija a formatação do seu arquivo OFX para facilitar a leitura em
            sistemas financeiros. Selecione o extrato e baixe a versão ajustada.
          </p>
          <figure className="format-example">
            <figcaption>Exemplo de correção de uma tag</figcaption>
            <dl>
              <div>
                <dt>Original</dt>
                <dd>
                  <code>{"<TRNAMT>-20.00"}</code>
                </dd>
              </div>
              <div>
                <dt>Corrigido</dt>
                <dd>
                  <code>{"<TRNAMT>-20.00</TRNAMT>"}</code>
                </dd>
              </div>
            </dl>
          </figure>
          <div className="privacy-note">
            <LockKeyhole aria-hidden size={19} />
            <p>
              Processamento em memória.
              <br />
              <span>Sem armazenamento permanente do arquivo.</span>
            </p>
          </div>
          <a className="text-link" href="#como-funciona">
            Entenda o que é corrigido <ArrowDown aria-hidden size={16} />
          </a>
        </section>
        <UploadForm />
        <section
          id="como-funciona"
          className="instructions"
          aria-labelledby="instrucoes-titulo"
        >
          <div className="section-heading">
            <p className="eyebrow">DO ARQUIVO À IMPORTAÇÃO</p>
            <h2 id="instrucoes-titulo">Como formatar o extrato</h2>
          </div>
          <ol className="step-list">
            {steps.map(([number, title, description]) => (
              <li key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
          <div className="scope-note">
            <FileCheck2 aria-hidden size={20} />
            <p>
              A correção trata a estrutura do OFX, incluindo fechamento de tags
              e padronização de datas. Mantenha o original para comparação: esta
              ferramenta não faz conciliação de saldos ou lançamentos.
            </p>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-width footer-inner">
          <p>
            Desenvolvido por <strong>Samuel Yuiti</strong>
          </p>
          <div>
            <a href="mailto:samuelyuit@gmail.com">E-mail</a>
            <a
              href="https://www.linkedin.com/in/samuelyuiti/"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Samuel-Yuiti-SY/Ofx-Formatter"
              rel="noreferrer"
              target="_blank"
            >
              Código no GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
