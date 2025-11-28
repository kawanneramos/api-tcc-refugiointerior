const db = require('../database/connection');
const { gerarUrl } = require('../utils/gerarUrl');

module.exports = {
    async listarPublicacao(request, response) {
        try {
            const sql = ` 
                SELECT 
                    pub_id, 
                    usu_id, 
                    pub_titulo, 
                    pub_texto,
                    pub_data_postagem, 
                    pub_imagem, 
                    pub_status 
                FROM publicacoes;
            `;
            
            const [rows] = await db.query(sql);
            
            // ALTERNATIVA SEM MEXER COM TODOS OS CAMPOS
            const dados = rows.map(publicacoes => ({
                ...publicacoes,
                ing_img: gerarUrl(publicacoes.ing_img, 'publicacoes', 'pub1img.jpg','pub2img.jpg','pub3img.png','pub4img.png'
                ,'pub5img.webp','pub6img.webp','pub7img.jpg','pub8img.png','pub9img.webp','pub10img.webp')
            }));

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Publicações', 
                itens: rows.length, // CORREÇÃO: rows.length (estava rows.lenght)
                dados: dados // CORREÇÃO: dados (estava rows)
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
            // USE OS NOMES CORRETOS (COM PREFIXO pub_)
            const {
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
                pub_imagem, 
                pub_status 
            } = request.body;

            // Validação dos campos obrigatórios
            if (!usu_id || !pub_titulo || !pub_texto || !pub_data_postagem) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios faltando!',
                    dados: 'usu_id, pub_titulo, pub_texto e pub_data_postagem são obrigatórios'
                });
            }

            const sql = `
                INSERT INTO publicacoes 
                (usu_id, pub_titulo, pub_texto, pub_data_postagem, pub_imagem, pub_status) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            
            const values = [
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
                pub_imagem || null, 
                pub_status || 'ativo'
            ];
            
            const [result] = await db.query(sql, values);
            
            const dados = {
                pub_id: result.insertId,
                usu_id,
                pub_titulo, 
                pub_texto, 
                pub_data_postagem,
                pub_imagem, 
                pub_status
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Publicação cadastrada com sucesso!', 
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
            // USE OS NOMES CORRETOS (COM PREFIXO pub_)
            const {
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
                pub_imagem, 
                pub_status 
            } = request.body;
            
            const { pub_id } = request.params;

            // Validação do ID
            if (!pub_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da publicação é obrigatório!',
                    dados: null
                });
            }

            const sql = `
                UPDATE publicacoes SET
                    usu_id = ?, 
                    pub_titulo = ?, 
                    pub_texto = ?,
                    pub_data_postagem = ?, 
                    pub_imagem = ?, 
                    pub_status = ? 
                WHERE pub_id = ?;            
            `;
            
            const values = [
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
                pub_imagem || null, 
                pub_status || 'ativo', 
                pub_id
            ];
            
            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: `Publicação ${pub_id} não encontrada!`, 
                    dados: null
                });
            }

            const dados = {
                pub_id: parseInt(pub_id),
                usu_id,
                pub_titulo, 
                pub_texto, 
                pub_data_postagem,
                pub_imagem, 
                pub_status
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Publicação ${pub_id} atualizada com sucesso!`, 
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
            const { pub_id } = request.params;
            
            // Validação do ID
            if (!pub_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da publicação é obrigatório!',
                    dados: null
                });
            }

            const sql = `DELETE FROM publicacoes WHERE pub_id = ?`;
            const values = [pub_id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Publicação ${pub_id} não encontrada!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Publicação ${pub_id} excluída com sucesso!`, 
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