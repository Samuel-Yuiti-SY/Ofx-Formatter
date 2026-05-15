# Formatador de Extrato Caixa

Site profissional para corrigir e formatar extratos bancários no padrão `.ofx`, com foco em arquivos gerados pela Caixa.

A ferramenta foi criada para tornar o processo simples: a pessoa seleciona o extrato, o sistema processa o arquivo em poucos segundos e devolve um novo `.ofx` pronto para download.

## Acesse o site

Produção na Vercel:

https://site-extratos-ofx.vercel.app

## Versão

Versão atual: `1.0.2`

## Funcionalidades

- Upload de arquivos `.ofx`
- Validação de formato antes do envio
- Correção de tags simples do OFX sem duplicar fechamentos
- Normalização de datas e horários
- Inclusão de timezone quando necessário
- Processamento em memória, sem armazenamento permanente no servidor
- Download do arquivo corrigido como attachment
- Interface responsiva para celular e desktop

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- API Route serverless
- Deploy na Vercel

## Como usar

1. Acesse o site da Vercel.
2. Clique em `Selecionar Extrato Caixa`.
3. Escolha um arquivo com extensão `.ofx`.
4. Aguarde o processamento.
5. Clique em `Baixar extrato formatado`.

Se outro tipo de arquivo for selecionado, o sistema exibe a mensagem:

```text
Arquivo inválido. O padrão recomendado é .ofx.
```

## Como rodar localmente

Requisitos:

- Node.js 20.9 ou superior
- npm

Instale as dependências:

```bash
npm install
```

Inicie o ambiente local:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev
```

Executa o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a build de produção.

```bash
npm run start
```

Executa a build de produção localmente.

## Estrutura principal

```text
src/
  app/
    api/formatar/route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    upload-form.tsx
  lib/
    formatar-ofx.ts
```

## Processamento do OFX

A lógica principal está em `src/lib/formatar-ofx.ts`.

A rota `POST /api/formatar` recebe o arquivo via `FormData`, valida a extensão, processa o conteúdo em memória e retorna o `.ofx` corrigido com `Content-Disposition: attachment`.

Nenhum arquivo é salvo permanentemente no servidor.

## Deploy

O projeto está pronto para deploy na Vercel.

Configurações recomendadas:

- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: padrão da Vercel para Next.js

Para publicar manualmente com a Vercel CLI:

```bash
vercel --prod
```

## Créditos

Site criado por: Samuel Yuiti

E-mail: samuelyuit@gmail.com

LinkedIn: https://www.linkedin.com/in/samuelyuiti/
