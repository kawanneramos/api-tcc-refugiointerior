const db = require('../database/connection'); 
const { gerarUrl } = require('../utils/gerarUrl');

module.exports = {
    async listarComentarios(request, response) {
        try {
            const sql = `
             
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

            const {pub_id, usu_id, com_texto, com_moderacao} = request.body;
             
             const sql = `
                INSERT INTO comentarios (pub_id, usu_id, com_texto, com_moderacao) VALUES 
                (?,?,?,?);
            `;

            const values = [pub_id, usu_id, com_texto, com_moderacao];
            
            const [result] = await db.query(sql, values);

        
               
                
            

            // ALTERNATIVA SEM MEXER COM TODOS OS CAMPOS
            const dados = rows.map(ingrediente => ({
                ...ingrediente,
                ing_img: gerarUrl(ingrediente.ing_img, 'ingredientes', 'sem.jpg'),
                id: result.insertId,
                com_texto,
                com_moderacao
            }));
           
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de comentarios', 
                dados: dados,
                nItens
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
            const {pub_id, usu_id, com_texto, com_moderacao} = request.body;

            const {id} = request.params;

            const sql = `
            UPDATE Comentarios SET
            pub_id = ?, usu_id = ?,
             com_texto = ?, com_moderacao = ?
            WHERE
            com_id = ?;
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
               com_texto,
               com_moderacao
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
            const { id } = request.params;
            const sql = `DELETE FROM Comentarios WHERE com_id = ?`;
            const values = [id];
            const[result] = await db.query(sql, values);

            if (result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Comentario ${id} não encontrado!`,
                    dados: null
                });
            }
            return response.status(200).json({
                sucesso: true, 
                mensagem:`Comentario ${id} Excluido com sucesso `, 
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