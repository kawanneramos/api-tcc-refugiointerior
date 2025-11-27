const db = require('../database/connection');

module.exports = {

    // ============================
    // LISTAR AGENDAMENTOS
    // ============================
    async listarAgendamento(request, response) {
        try {
            const sql = `
                SELECT 
                    agd_id, 
                    usu_id, 
                    agd_paciente,  
                    agd_data_consulta, 
                    agd_inicio_consulta, 
                    agd_fim_consulta, 
                    agd_anotacoes_consulta 
                FROM agendamentos;
            `;

            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Agendamentos.',
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


    // ============================
    // CADASTRAR AGENDAMENTO
    // ============================
    async cadastrarAgendamento(request, response) {
        try {
            const {
                usu_id, 
                agd_paciente, 
                data_consulta, 
                inicio_consulta, 
                fim_consulta, 
                anotacoes_consulta
            } = request.body;

            const sql = `
                INSERT INTO agendamentos 
                (usu_id, agd_paciente, agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const values = [
                usu_id,
                agd_paciente,
                data_consulta,
                inicio_consulta,
                fim_consulta,
                anotacoes_consulta
            ];

            const [result] = await db.query(sql, values);

            const dados = {
                agd_id: result.insertId,
                usu_id,
                agd_paciente,
                agd_data_consulta: data_consulta,
                agd_inicio_consulta: inicio_consulta,
                agd_fim_consulta: fim_consulta,
                agd_anotacoes_consulta: anotacoes_consulta
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Agendamento cadastrado com sucesso!',
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


    // ============================
    // EDITAR AGENDAMENTO
    // ============================
    async editarAgendamento(request, response) {
        try {
            const {
                usu_id,
                data_consulta,
                inicio_consulta,
                fim_consulta,
                anotacoes_consulta
            } = request.body;

            const { agd_id } = request.params;

            const sql = `
                UPDATE agendamentos SET
                    usu_id = ?, 
                    agd_data_consulta = ?, 
                    agd_inicio_consulta = ?, 
                    agd_fim_consulta = ?, 
                    agd_anotacoes_consulta = ?
                WHERE agd_id = ?;
            `;

            const values = [
                usu_id,
                data_consulta,
                inicio_consulta,
                fim_consulta,
                anotacoes_consulta,
                agd_id
            ];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Agendamento ${agd_id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                agd_id,
                usu_id,
                agd_data_consulta: data_consulta,
                agd_inicio_consulta: inicio_consulta,
                agd_fim_consulta: fim_consulta,
                agd_anotacoes_consulta: anotacoes_consulta
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: `Agendamento ${agd_id} atualizado com sucesso!`,
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


    // ============================
    // APAGAR AGENDAMENTO
    // ============================
    async apagarAgendamento(request, response) {
        try {
            const { agd_id } = request.params;

            const sql = `DELETE FROM agendamentos WHERE agd_id = ?`;
            const values = [agd_id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Agendamento ${agd_id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Agendamento ${agd_id} excluído com sucesso!`,
                dados: null
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
};
