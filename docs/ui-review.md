# Revisão da interface OFX — 25/11/2026

Direção: ferramenta de trabalho com fundo neutro, tipografia editorial, verde discreto, divisórias e área de upload como ação principal. Sem dependências novas de interface.

Referências consultadas: https://minimal.gallery/ (hierarquia e composição), https://ui.shadcn.com/docs/components/base/field (rótulos, ajuda e estados). Nenhum componente ou identidade de terceiros foi copiado. Land-book retornou 403.

Preservados: endpoint POST /api/formatar, transformação do OFX, limite do servidor, download e contatos. Adicionados: arrastar e soltar com bloqueio de processamento simultâneo, validação de tamanho no cliente, foco visível, link para saltar ao conteúdo, movimento reduzido e metadados.

Validação local executada:

- Build Next.js e verificação TypeScript aprovados.
- Playwright: sem overflow em 360, 390, 430, 768, 1024, 1280, 1440, 1920 e 2560 px.
- Upload inválido por extensão, conteúdo sem OFX e requisição sem arquivo rejeitados.
- Upload válido gera download com nome correto, preserva valor/identificador e aplica fechamento de tags e fuso horário.
- Nenhum erro JavaScript na sessão de teste.
- axe-core: nenhuma violação automática nos critérios A/AA testados. Isso não equivale a certificação WCAG.
- Lint e testes unitários não existiam no repositório; não declarados como aprovados. Testes funcionais foram executados por Playwright.

Limitações: não é uma conciliação contábil; não testa todos os layouts bancários. Core Web Vitals de campo, INP e limites de upload da hospedagem ainda dependem de validação do deployment. Produção deve ser preservada até validar o preview.
