const db = require('../dataBase/connection'); 

module.exports = {
    async listarComentarios(request, response) {
        try {
            const sql = `
            SELECT 
            SELECT com_id, pub_id, usu_id,
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
                com_id: result.insertId,
                texto,
                moderacao
                
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
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alteração no cadastro de comentario', 
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
    async apagarComentarios(request, response) {
        try {
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