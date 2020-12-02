const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/database/conexao");
const Tabelas = require("./infraestrutura/database/tables");

conexao.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    const app = customExpress();
    Tabelas.init(conexao);
    app.listen(3000, () => {
      console.log("servidor rodando na porta 3000");
    });
  }
});
