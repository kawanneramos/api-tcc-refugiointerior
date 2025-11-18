const db = require('../database/connection'); 

module.exports = {
    async listarLocalizacoes(request, response) {
        try {
            const sql = `
            SELECT lcz_id, usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf 
            FROM localizacoes;
            `;
            const[rows] = await db.query(sql);
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de localizações', 
                dados: rows,
                itens: rows.lenghth
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async cadastrarLocalizacoes(request, response) {
        try {
            const{usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf}= request.body;

            const sql= `
               INSERT INTO localizacoes 
                (usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf)  
                VALUES
                     (?, ?, ?, ?, ?, ?, ?, ?);
            `
            
            const values= [usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf];

            const [result]= await db.query(sql, values);

            const dados= {
                lcz_id: result.insertId,
                lcz_nome_clinica,
                lcz_cep,
                lcz_logradouro,
                lcz_complemento, 
                lcz_bairro,
                lcz_localidade
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de localização', 
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
    async editarLocalizacoes(request, response) {
        try {
            const{usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf}= request.body;
            const {lcz_id} = request.params;

            const sql= `
                UPDATE localizacoes SET 
                   usu_id = ?, lcz_nome_clinica = ?, lcz_cep = ?, lcz_logradouro = ?, lcz_complemento = ?, lcz_bairro = ?, lcz_localidade = ?,  lcz_uf = ?
                   WHERE 
                     lcz_id = ?;
            `;

            const values= [usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf];

            const [result]= await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404) .json({
                    sucesso: false,
                    mensagem:`Localização ${lcz_id} não encontrada!`,
                    dados:null
                });
            }

            const dados = {
                lcz_id: result.insertId,
                lcz_nome_clinica,
                lcz_cep,
                lcz_logradouro,
                lcz_complemento, 
                lcz_bairro,
                lcz_localidade  
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Localização ${lcz_id} atualizado com sucesso!`, 
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
    async apagarLocalizacoes(request, response) {
        try {
            const {lcz_id} = request.params;
            const sql=`DELETE FROM localizacoes WHERE lcz_id= ?`;
            const values = [lcz_id];
            const [result]= await db.query(sql, values) ;

            if(result.affectedRows === 0) {
                return response.status(404) .json({
                    sucesso: false,
                    mensagem:`Localização ${lcz_id} não encontrado!`,
                    dados:null
                });
            }
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Localização ${lcz_id} excluida com sucesso`, 
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