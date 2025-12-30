import re

def formatar_extrato_ofx(arquivo_entrada, arquivo_saida):
    """
    Normaliza e corrige arquivos OFX (especialmente Caixa),
    preservando a estrutura e evitando quebras indevidas.

    - Limpa espaços e quebras erradas
    - Corrige datas e timezone
    - Mantém tags simples em uma única linha
    - Gera um OFX seguro para importação em ERPs
    """

    # --- Leitura ---
    with open(arquivo_entrada, "r", encoding="utf-8") as f:
        conteudo = f.read()

    # --- Limpeza inicial ---
    # Remove BOM e espaços invisíveis comuns
    conteudo = conteudo.replace("\ufeff", "").strip()

    # Remove espaços e quebras ENTRE tags: >   <  -> ><
    conteudo = re.sub(r">\s+<", "><", conteudo)

    # Remove espaços excessivos dentro de tags simples
    conteudo = re.sub(
        r"<(\w+)>\s*([^<\n]+?)\s*</\1>",
        r"<\1>\2</\1>",
        conteudo
    )

    # --- Correção de datas ---
    # Remove milissegundos
    conteudo = re.sub(r"(\d{14})\.\d+", r"\1", conteudo)

    # Garante timezone apenas em DTPOSTED
    conteudo = re.sub(
        r"<DTPOSTED>(\d{14})(?!\[)",
        r"<DTPOSTED>\1[-3:BRT]",
        conteudo
    )

    # DTSTART e DTEND apenas AAAAMMDD
    conteudo = re.sub(
        r"<DTSTART>(\d{8}).*?</DTSTART>",
        r"<DTSTART>\1</DTSTART>",
        conteudo
    )

    conteudo = re.sub(
        r"<DTEND>(\d{8}).*?</DTEND>",
        r"<DTEND>\1</DTEND>",
        conteudo
    )

    # --- Padronização de campos ---
    # Alguns bancos usam NAME onde o ERP espera MEMO
    conteudo = conteudo.replace("<NAME>", "<MEMO>").replace("</NAME>", "</MEMO>")

    # --- Formatação segura ---
    # Quebra linha APENAS entre fechamento e abertura de tags
    conteudo = re.sub(r"><", ">\n<", conteudo)

    # Remove múltiplas linhas em branco
    conteudo = re.sub(r"\n{2,}", "\n", conteudo).strip()

    # --- Escrita final ---
    with open(arquivo_saida, "w", encoding="utf-8") as f:
        f.write(conteudo)

    print("Arquivo OFX formatado com sucesso.")
    print(f"Arquivo gerado: {arquivo_saida}")


if __name__ == "__main__":
    print("=== Formatador de Extrato OFX ===")
    entrada = input(
        "Informe o arquivo OFX de entrada (enter para 'extrato.ofx'): "
    ).strip() or "extrato.ofx"

    formatar_extrato_ofx(entrada, "novo_extrato.ofx")
