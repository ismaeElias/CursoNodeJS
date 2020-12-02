const axios = require("axios");
const moment = require("moment");
const conexao = require("../infraestrutura/database/conexao");
const repositorio = require("../repositorios/atendimento");

class Atendimentos {
  constructor(){
    
    this.validarData = ({data,dataCriacao}) => {
      moment(data).isSameOrAfter(dataCriacao);
    }

    
    this.validarCliente = ({tamanho}) =>  tamanho >= 5;
    this.valida = (params) => {
      this.validacao.filter(campo => {
        const {nome} = campo;
        const params = params[nome];

        return !campo.valido(params);
      });
    }
    this.validacao = [
      {
        nome: "data",
        valido: this.validarData,
        message: "Data deve ser maior ou igual a data atual.",
      },
      {
        nome: "Cliente",
        valido: this.validarCliente,
        message: "Cliente deve ter pelo menos 5 caracteres.",
      },
    ];
  }
  adiciona(atendimento) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const params = {
      data : { data, DataCriacao},
      cliente : {tamanho : atendimento.cliente.length}
    }
    const erros = this.valida(params);

    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => {
        reject(erros);
      })
    } else {
      const atedimentoDatado = { ...atendimento, dataCriacao, data };

      return repositorio.adiciona(atedimentoDatado).then((result) => {
        const id = result.insertId;
        return ({ ...atendimento, id });
      });

    }
  }
  lista() {
    return repositorio.lista();
  }
  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE ID=${id}`;

    conexao.query(sql, async (error, result) => {
      const atendimento = result[0];
      const cpf = atendimento.cliente;
      if (error) {
        res.status(400).json(error);
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        atendimento.cliente = data;
        res.status(200).json(atendimento);
      }
    });
  }
  alterar(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    const sql = `UPDATE Atendimentos SET ? WHERE id=?`;

    conexao.query(sql, [valores, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }
  deletar(id, res) {
    const sql = `DELETE FROM ATENDIMENTOS WHERE ID=?`;

    conexao.query(sql, id, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimentos();
