const conexao = require("../infraestrutura/database/conexao");
const uploadArquivo = require("../infraestrutura/arquivos/uploadArquivos");

class Pet {
  adiciona(pet, res) {
    const sql = `INSERT INTO PETS SET ?`;

    uploadArquivo(pet.imagem, pet.nome, (error, novoCaminho) => {
      if (error) {
        res.status(400).json({error});
      } else {
        const novoPet = { nome: pet.nome, imagem: novoCaminho };

        conexao.query(sql, novoPet, (error) => {
          if (error) {
            res.status(400).json(error);
          } else {
            res.status(200).json(novoPet);
          }
        });
      }
    });
  }
}

module.exports = new Pet();
