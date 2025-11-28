const db = require('../database/connection'); 
const { gerarUrl } = require('../utils/gerarUrl');

module.exports = {
    async listarDisponibilidades(request, response) {
        try {
            const sql = `
                SELECT 
                    dsp_id, 
                    lcz_id, 
                    dsp_dia_semana, 
                    dsp_horario, 
                    dsp_status
                FROM disponibilidades;
            `;
            
            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Disponibilidades', 
                nItens: rows.length,
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

    async cadastrarDisponibilidades(request, response) {
        try {
            const {
                lcz_id, 
                dsp_dia_semana, 
                dsp_horario, 
                dsp_status
            } = request.body;

            if (!lcz_id || !dsp_dia_semana || !dsp_horario) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios faltando!',
                    dados: 'lcz_id, dsp_dia_semana e dsp_horario são obrigatórios'
                });
            }

            const sql = `
                INSERT INTO disponibilidades 
                (lcz_id, dsp_dia_semana, dsp_horario, dsp_status)
                VALUES (?, ?, ?, ?);
            `;
            
            const values = [
                lcz_id, 
                dsp_dia_semana, 
                dsp_horario, 
                dsp_status || 1
            ];
            
            const [result] = await db.query(sql, values);

            const dados = {
                dsp_id: result.insertId,
                lcz_id,
                dsp_dia_semana,
                dsp_horario,
                dsp_status: dsp_status || 1
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Disponibilidade cadastrada com sucesso!', 
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

    async editarDisponibilidades(request, response) {
        try {
            const {
                lcz_id, 
                dsp_dia_semana, 
                dsp_horario, 
                dsp_status
            } = request.body;

            const { id } = request.params; // CORREÇÃO: mudei dsp_id para id

            if (!id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da disponibilidade é obrigatório!',
                    dados: null
                });
            }

            const sql = `
                UPDATE disponibilidades SET
                    lcz_id = ?, 
                    dsp_dia_semana = ?,
                    dsp_horario = ?,  
                    dsp_status = ?
                WHERE dsp_id = ?;
            `;

            const values = [
                lcz_id, 
                dsp_dia_semana, 
                dsp_horario, 
                dsp_status || 1, 
                id // CORREÇÃO: mudei dsp_id para id
            ];
            
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Disponibilidade ${id} não encontrada!`,
                    dados: null
                });
            }

            const dados = {
                dsp_id: parseInt(id), // CORREÇÃO: mudei dsp_id para id
                lcz_id,
                dsp_dia_semana,
                dsp_horario,
                dsp_status: dsp_status || 1
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Disponibilidade ${id} atualizada com sucesso!`, 
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

    async apagarDisponibilidades(request, response) {
        try {
            const { id } = request.params; // CORREÇÃO: mudei dsp_id para id
            
            if (!id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da disponibilidade é obrigatório!',
                    dados: null
                });
            }

            const sql = `DELETE FROM disponibilidades WHERE dsp_id = ?`;
            const values = [id]; // CORREÇÃO: mudei dsp_id para id
            
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Disponibilidade ${id} não encontrada!`,
                    dados: null
                });
            }
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Disponibilidade ${id} excluída com sucesso!`, 
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