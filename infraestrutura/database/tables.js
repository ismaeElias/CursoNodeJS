class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarAtendimentos();
    this.criarPets();
  }
  criarAtendimentos() {
    const sql = `CREATE TABLE IF NOT EXISTS ATENDIMENTOS(
                    ID INT NOT NULL AUTO_INCREMENT, 
                    CLIENTE VARCHAR(11) NOT NULL, 
                    PET VARCHAR(20), 
                    SERVICO VARCHAR(20) NOT NULL,
                    DATA DATETIME NOT NULL,
                    DATACRIACAO DATETIME NOT NULL,
                    STATUS VARCHAR(20) NOT NULL,
                    OBS TEXT,
                    PRIMARY KEY(ID))`;
    this.conexao.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("tabela atendimentos criada com sucesso");
      }
    });
  }
  criarPets() {
    const sql = `CREATE TABLE IF NOT EXISTS Pets (
                ID INT NOT NULL AUTO_INCREMENT,
                NOME VARCHAR(50),
                IMAGEM VARCHAR(200),
                PRIMARY KEY(ID))`;
    this.conexao.query(sql, (error)=>{
      if(error){
        console.log(error);
      }else{
        console.log('Tabela criada com sucesso');
      }
    })
  }
}

module.exports = new Tabelas();
