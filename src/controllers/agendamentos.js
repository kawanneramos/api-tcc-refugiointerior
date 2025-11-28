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
    // CADASTRAR AGENDAMENTO - CORRIGIDO
    // ============================
    async cadastrarAgendamento(request, response) {
        try {
            const {
                usu_id, 
                agd_paciente, 
                agd_data_consulta,        // Nome correto
                agd_inicio_consulta,      // Nome correto
                agd_fim_consulta,         // Nome correto
                agd_anotacoes_consulta    // Nome correto
            } = request.body;

            // Validação dos campos obrigatórios
            if (!usu_id || !agd_paciente || !agd_data_consulta || !agd_inicio_consulta || !agd_fim_consulta) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios faltando!',
                    dados: 'usu_id, agd_paciente, agd_data_consulta, agd_inicio_consulta e agd_fim_consulta são obrigatórios'
                });
            }

            const sql = `
                INSERT INTO agendamentos 
                (usu_id, agd_paciente, agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const values = [
                usu_id,
                agd_paciente,
                agd_data_consulta,
                agd_inicio_consulta,
                agd_fim_consulta,
                agd_anotacoes_consulta || null  // Permite null se não enviado
            ];

            const [result] = await db.query(sql, values);

            const dados = {
                agd_id: result.insertId,
                usu_id,
                agd_paciente,
                agd_data_consulta,
                agd_inicio_consulta,
                agd_fim_consulta,
                agd_anotacoes_consulta
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
// EDITAR AGENDAMENTO - CORRIGIDO
// ============================
async editarAgendamento(request, response) {
    try {
        const {
            usu_id,
            agd_paciente,              // Este campo estava faltando no original
            agd_data_consulta,         
            agd_inicio_consulta,       
            agd_fim_consulta,          
            agd_anotacoes_consulta     
        } = request.body;

        const { agd_id } = request.params;

        // Validação do ID
        if (!agd_id) {
            return response.status(400).json({
                sucesso: false,
                mensagem: 'ID do agendamento é obrigatório!',
                dados: null
            });
        }

        // SQL CORRIGIDO - sem comentários
        const sql = `
            UPDATE agendamentos SET
                usu_id = ?, 
                agd_paciente = ?, 
                agd_data_consulta = ?, 
                agd_inicio_consulta = ?, 
                agd_fim_consulta = ?, 
                agd_anotacoes_consulta = ?
            WHERE agd_id = ?;
        `;

        const values = [
            usu_id,
            agd_paciente,
            agd_data_consulta,
            agd_inicio_consulta,
            agd_fim_consulta,
            agd_anotacoes_consulta || null,
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
            agd_id: parseInt(agd_id),
            usu_id,
            agd_paciente,
            agd_data_consulta,
            agd_inicio_consulta,
            agd_fim_consulta,
            agd_anotacoes_consulta
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

            if (!agd_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID do agendamento é obrigatório!',
                    dados: null
                });
            }

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