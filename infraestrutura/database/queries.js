const conexao = require("./conexao");

const executaQuery = (sql , params = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, params, (error,result,campos) => {
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        });
    });
   
}

module.exports = executaQuery;