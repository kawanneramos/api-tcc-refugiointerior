const db = require('../database/connection'); 
const { gerarUrl } = require('../utils/gerarUrl');

module.exports = {
    async listarRedes_apoio(request, response) {
        try {
            const sql = `
                SELECT 
                    redeapoio_id, 
                    redeapoio_nome, 
                    redeapoio_descricao, 
                    redeapoio_contato, 
                    redeapoio_logo, 
                    redeapoio_link
                FROM redes_apoio;
            `;
            
            const [rows] = await db.query(sql);

            // ALTERNATIVA SEM MEXER COM TODOS OS CAMPOS
            const dados = rows.map(redes_apoio => ({
                ...redes_apoio,
                ing_img: gerarUrl(redes_apoio.ing_img, 'redes_apoio', 'cvv.png','IBE.png','IVA.png','RPF.png')
            }));

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de redes de apoio', 
                itens: rows.length,
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

    async cadastrarRedes_apoio(request, response) {
        try {
            // USE OS NOMES CORRETOS (COM PREFIXO redeapoio_)
            const { 
                redeapoio_nome, 
                redeapoio_descricao, 
                redeapoio_contato, 
                redeapoio_logo, 
                redeapoio_link 
            } = request.body;

            // Validação do campo obrigatório
            if (!redeapoio_nome) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'O nome da rede de apoio é obrigatório!',
                    dados: null
                });
            }

            const sql = `
                INSERT INTO redes_apoio 
                (redeapoio_nome, redeapoio_descricao, redeapoio_contato, redeapoio_logo, redeapoio_link) 
                VALUES (?, ?, ?, ?, ?);
            `;
            
            const values = [
                redeapoio_nome, 
                redeapoio_descricao || null, 
                redeapoio_contato || null, 
                redeapoio_logo || null, 
                redeapoio_link || null
            ];

            const [result] = await db.query(sql, values);

            const dados = {
                redeapoio_id: result.insertId,
                redeapoio_nome,
                redeapoio_descricao,
                redeapoio_contato,
                redeapoio_logo,
                redeapoio_link
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Rede de apoio cadastrada com sucesso!', 
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
            // USE OS NOMES CORRETOS (COM PREFIXO redeapoio_)
            const { 
                redeapoio_nome, 
                redeapoio_descricao, 
                redeapoio_contato, 
                redeapoio_logo, 
                redeapoio_link 
            } = request.body;
            
            const { redeapoio_id } = request.params;

            // Validação do ID
            if (!redeapoio_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da rede de apoio é obrigatório!',
                    dados: null
                });
            }

            const sql = `
                UPDATE redes_apoio SET
                    redeapoio_nome = ?, 
                    redeapoio_descricao = ?, 
                    redeapoio_contato = ?, 
                    redeapoio_logo = ?, 
                    redeapoio_link = ?
                WHERE redeapoio_id = ?;
            `;
            
            const values = [
                redeapoio_nome,
                redeapoio_descricao || null,
                redeapoio_contato || null, 
                redeapoio_logo || null,
                redeapoio_link || null,
                redeapoio_id
            ];

            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Rede de apoio ${redeapoio_id} não encontrada!`,
                    dados: null
                });
            }

            const dados = {
                redeapoio_id: parseInt(redeapoio_id),
                redeapoio_nome,
                redeapoio_descricao,
                redeapoio_contato,
                redeapoio_logo,
                redeapoio_link
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Rede de apoio ${redeapoio_id} atualizada com sucesso!`, 
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
            const { redeapoio_id } = request.params;
            
            // Validação do ID
            if (!redeapoio_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da rede de apoio é obrigatório!',
                    dados: null
                });
            }

            const sql = `DELETE FROM redes_apoio WHERE redeapoio_id = ?`;
            const values = [redeapoio_id];
            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Rede de apoio ${redeapoio_id} não encontrada!`,
                    dados: null
                });
            }
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Rede de apoio ${redeapoio_id} excluída com sucesso`, 
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