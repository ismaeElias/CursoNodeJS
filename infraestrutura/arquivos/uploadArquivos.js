const fs = require("fs");
const path = require("path");

module.exports = (caminho, nomeImage, callbackImagemCriada) => {
  const tiposValidos = ["jpg", "png", "jpeg"];
  const tipo = path.extname(caminho);
  const ValidaTipo = tiposValidos.indexOf(tipo.substring(1)) !== -1;

  if (ValidaTipo) {
    const novoCaminho = `./assets/image/${nomeImage}${tipo}`;

    fs.createReadStream(caminho)
      .pipe(fs.createWriteStream(novoCaminho))
      .on("finish", () => callbackImagemCriada(false, novoCaminho));
  } else {
    const error = "Tipo é invaldio";
    console.log("Tipo invalido");

    callbackImagemCriada(error);
  }
};
