const db = require('../dataBase/connection'); 

module.exports = {
    async listarComentarios(request, response) {
        try {
            const sql = `
             
            SELECT id, pub_id, usu_id,
             com_texto, com_moderacao FROM comentarios;
            `;
            const [rows] = await db.query(sql);
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de comentarios', 
                itens: rows.length,
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
    async cadastrarComentarios(request, response) {
        try {

            const {pub_id, usu_id, texto, moderacao} = request.body;
             
             const sql = `
                INSERT INTO comentarios (pub_id, usu_id, com_texto, com_moderacao) VALUES 
                (?,?,?,?);
            `;

            const values = [pub_id, usu_id, texto, moderacao];
            
            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId,
                texto
                
            };
           
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de comentarios', 
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
    async editarComentarios(request, response) {
        try {
            const {pub_id, usu_id, texto, moderacao} = request.body;

            const {id} = request.params;

            const sql = `
            UPTADE comentarios SET
            pub_id = ?, usu_id = ?,
             com_texto = ?, com_moderacao = ?
            WHERE
            id = ?;
            `;

            const values = [ pub_id, usu_id,com_texto, com_moderacao, id ];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
               return response.status(404).json({
                sucesso: false,
                mensagem: `Comentario ${id}não encontrado!`,
                dados: null

               });

            }
            const dados = {
               id,
               texto
            };
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alteração no cadastro de comentario ${id}', 
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
    async apagarComentarios(request, response) {
        try {
            const {id} = request.params
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Exclusão de comentario', 
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