const db = require('../database/connection');
const { gerarUrl } = require('../utils/gerarUrl');
module.exports = {
    async listarPublicacao(request, response) {
        try {

             const sql = ` 
             SELECT 
                  pub_id, psi_id, pub_titulo, pub_texto,
                  pub_data_postagem, pub_imagem, pub_status FROM publicacoes;
             `;
            const [ rows] = await db.query(sql);
            
             // ALTERNATIVA SEM MEXER COM TODOS OS CAMPOS
            const dados = rows.map(ingrediente => ({
                ...ingrediente,
                ing_img: gerarUrl(ingrediente.ing_img, 'ingredientes', 'sem.jpg')
            }));


            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Publicação', 
                itens: rows.lenght,
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


    async cadastrarPublicacao(request, response) {
        try {
            const {psi_id, titulo, texto, data_postagem, imagem, status} = request.body;
            const sql = `
            INSERT INTO publicacoes 
                  (psi_id, pub_titulo, pub_texto, pub_data_postagem, pub_imagem, pub_status) 
                  VALUES 
                  (?,?,?,?,?,?)
            `;
            const values = [psi_id, titulo, texto, data_postagem, imagem, status];
            const [ result] = await db.query(sql, values);
            const dados = {
                id: result.insertId,
                 psi_id,
                 titulo, 
                 texto, 
                 data_postagem,
                  imagem, 
                  status
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de Publicação', 
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


    async editarPublicacao(request, response) {
        try {
            const {psi_id, titulo, texto, data_postagem, imagem, status} = request.body;
            const {pub_id} = request.params;
            const sql = `
                 UPDATE publicacoes SET
                   psi_id = ?, pub_titulo = ?, pub_texto = ?,
                   pub_data_postagem = ?, pub_imagem = ?, pub_status = ? 
                WHERE
                   pub_id = ?;            
            `;
            const values = [psi_id, titulo, texto, data_postagem, imagem, status, pub_id];
            const [ result] = await db.query(sql, values);

            if(result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: `Publicação ${pub_id} não encontrado!`, 
                    dados: null
                });
            };

            const dados = {
                pub_id,
                psi_id,
                titulo, 
                texto, 
                data_postagem,
                imagem, 
                status
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Alteração ${pub_id} atualizada com sucesso!`, 
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




    async apagarPublicacao(request, response) {
        try {

         const {pub_id} = request.params;
         const sql = `DELETE FROM publicacoes WHERE pub_id = ?`;
         const values = [pub_id];
         const [result] = await db.query(sql,values);

         if (result.affectedRows === 0){
            return response.status(404).json({
                   sucesso: false,
                   mensagem:`Publicação ${pub_id} não encontrado!`,
                   dados:null

            });
         }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Publicação ${pub_id} excluido com sucesso!`, 
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

}