# Formatador OFX

## Público e identidade

Quem importa extratos da Caixa precisa corrigir um arquivo e baixá-lo em poucos passos. Voz de ferramenta bancária.

## Paleta e semântica

Papel #eff3f8, tinta #132f53, azul de ação #144d96, borda #c6d3df e âmbar #f0b05c. Estados de sucesso e erro sempre incluem texto.

## Tipografia e escala

Arial para controles; monoespaçada para tags e extensões. Título fluido de 37 a 64 px; rótulos de 12 a 16 px e dados tabulares.

## Composição e breakpoints

Duas colunas acima de 700 px, com upload à direita. Abaixo disso, título curto, envio e só então instruções. Régua de 4 a 24 px; raio de 3 px; sombra leve só no painel.

## Componentes e estados

O botão de arquivo é acessível por teclado. O estado de processamento evita duplo envio e o retorno informa o próximo passo. Erros de tamanho e formato têm mensagens distintas.

## Exemplo de aplicação

O exemplo de TRNAMT pertence à explicação; a operação principal deve caber cedo na tela de um celular. Testar com arquivos sintéticos.

## Evitar

Landing page antes do envio, barra de progresso simulada e exposição de conteúdo financeiro.

## Acessibilidade e movimento

Preservar landmarks e ordem de leitura. Garantir foco visível e texto para estados de sucesso ou erro. Testar teclado, movimento reduzido e telas de 360 a 1920 px. Ícones decorativos ficam fora da árvore de acessibilidade. Não depender de animação para revelar uma ação.

## Referências públicas

- Envio como ação primária. https://smallpdf.com
- Um arquivo por operação. https://www.ilovepdf.com
- Resultado com download. https://cloudconvert.com
- Rótulo do seletor. https://design-system.service.gov.uk/components/file-upload/
- Erros acionáveis. https://design-system.service.gov.uk/components/error-summary/

## Origem da implementação

Componentes adaptados no próprio projeto. Nenhum template comercial ou código de uma referência foi incorporado nesta revisão.
