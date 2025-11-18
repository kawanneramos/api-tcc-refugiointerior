const db = require('../database/connection'); 

module.exports = {
    async listarRedes_apoio(request, response) {
        try {
            const sql = `
            SELECT redeapoio_id, redeapoio_nome, redeapoio_descricao, redeapoio_contato, redeapoio_logo, redeapoio_link
             FROM  redes_apoio;
            `;
            
            const [rows] =await db.query(sql);
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de redes_apoio', 
                itens: rows.lenghth,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async cadastrarRedes_apoio(request, response) {
        try {
            const{nome, descricao, contato, logo}= request.body;

            const sql= `
                INSERT INTO redes_apoio 
              (redeapoio_nome, redeapoio_descricao, redeapoio_contato, redeapoio_logo, redeapoio_link) 
              VALUES
                     (?, ?, ?, ?, ?);
            `
            const values= [nome, descricao, contato, logo];

            const [result]= await db.query(sql, values);

            const dados= {
                redeapoio_id: result.insertId,
                nome,
                descricao,
                contato,
                logo
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de redes_apoio', 
                dados: dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async editarRedes_apoio(request, response) {
        try {
            const{nome, descricao, contato, logo}= request.body;
            const {redeapoio_id} = request.params;

            const sql= `
                UPDATE redes_apoio SET
                    redeapoio_nome = ?, redeapoio_descricao = ?, redeapoio_contato = ?, redeapoio_logo= ? redeapoio_link= ?
                 WHERE 
                     redeapoio_id = ?;
            `
            const values= [nome, descricao, contato, logo,redeapoio_id];

            const [result]= await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404) .json({
                    sucesso: false,
                    mensagem:`Rede de apoio ${redeapoio_id} não encontrado!`,
                    dados:null
                });
            }

            const dados = {
                redeapoio_id,
                nome,
                descricao,
                contato,
                logo
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Rede de apoio ${redeapoio_id} atualizado com sucesso!`, 
                dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }, 
    async apagarRedes_apoio(request, response) {
        try {
            const {redeapoio_id} = request.params;
            const sql=`DELETE FROM redes_apoio WHERE redeapoio_id= ?`;
            const values = [redeapoio_id];
            const [result]= await db.query(sql, values) ;

            if(result.affectedRows === 0) {
                return response.status(404) .json({
                    sucesso: false,
                    mensagem:`Rede de apoio ${redeapoio_id} não encontrado!`,
                    dados:null
                });
            }
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Rede de apoio ${redeapoio_id} excluido com sucesso`, 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
};  