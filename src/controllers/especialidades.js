const db = require('../database/connection'); 

module.exports = {
    async listarEspecialidades(request, response) {
        try {
            const sql = `
                SELECT 
                    esp_id, 
                    usu_id, 
                    esp_nome
                FROM especialidades; 
            `;

            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Especialidades', 
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

    async cadastrarEspecialidades(request, response) {
        try {
            const { usu_id, esp_nome } = request.body;

            // Validação dos campos obrigatórios
            if (!usu_id || !esp_nome) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios faltando!',
                    dados: 'usu_id e esp_nome são obrigatórios'
                });
            }

            const sql = `
                INSERT INTO especialidades (usu_id, esp_nome) 
                VALUES (?, ?);
            `;

            const values = [usu_id, esp_nome];

            const [result] = await db.query(sql, values);

            const dados = {
                esp_id: result.insertId,
                usu_id,
                esp_nome
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Especialidade cadastrada com sucesso!', 
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

    async editarEspecialidades(request, response) {
        try {
            const { usu_id, esp_nome } = request.body;
            const { id } = request.params; // CORREÇÃO: use id (igual suas rotas)

            // Validação do ID
            if (!id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da especialidade é obrigatório!',
                    dados: null
                });
            }

            const sql = `
                UPDATE especialidades SET
                    usu_id = ?, 
                    esp_nome = ?
                WHERE esp_id = ?;
            `;

            const values = [usu_id, esp_nome, id]; // CORREÇÃO: adicionei o id

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Especialidade ${id} não encontrada!`,
                    dados: null
                });
            }

            const dados = {
                esp_id: parseInt(id),
                usu_id,
                esp_nome
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Especialidade ${id} atualizada com sucesso!`, 
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

    async apagarEspecialidades(request, response) {
        try {
            const { id } = request.params; // CORREÇÃO: use id (igual suas rotas)

            // Validação do ID
            if (!id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da especialidade é obrigatório!',
                    dados: null
                });
            }

            const sql = `DELETE FROM especialidades WHERE esp_id = ?`;
            const values = [id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Especialidade ${id} não encontrada!`,
                    dados: null
                });
            }

            // CORREÇÃO: status 200 em vez de 500
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Especialidade ${id} excluída com sucesso!`,
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