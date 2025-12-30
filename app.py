from flask import Flask, render_template, request, send_file
import os
import uuid

from ofx_formatter import formatar_extrato_ofx

app = Flask(__name__)
UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        arquivo = request.files.get("arquivo")

        if not arquivo or not arquivo.filename.endswith(".ofx"):
            return "Arquivo inválido. Envie um .ofx", 400

        nome_base = uuid.uuid4().hex
        entrada = os.path.join(UPLOAD_DIR, f"{nome_base}.ofx")
        saida = os.path.join(UPLOAD_DIR, f"{nome_base}_novo.ofx")

        arquivo.save(entrada)
        formatar_extrato_ofx(entrada, saida)

        return send_file(
            saida,
            as_attachment=True,
            download_name="extrato_formatado.ofx"
        )

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
