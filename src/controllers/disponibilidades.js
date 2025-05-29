const db = require('../dataBase/connection'); 

module.exports = {
    async listarDisponibilidades(request, response) {
        try {
            const sql = 
             `
            SELECT dsp_id, lcz_id, dsp_dia_semana, dsp_horario, 
            dsp_status FROM disponibilidades;
            `;
            const [rows] = await db.query(sql);
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Disponibilidades', 
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
    async cadastrarDisponibilidades(request, response) {
        try {

             const {lcz_id, dsp_dia_semana, dsp_horario, dsp_status} = request.body;
             
             const sql = `
             INSERT INTO disponibilidades 
             (lcz_id, dsp_dia_semana, dsp_horario, dsp_status)
              VALUES
                (?,?,?,?);
            `;
            const values = [lcz_id, dsp_dia_semana, dsp_horario, dsp_status];
            
            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId,
                dsp_dia_semana,
                dsp_horario,
                dsp_status
            };


            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de disponibilidades', 
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
            const {lcz_id, dsp_dia_semana, dsp_horario, dsp_status} = request.body;

            const {id} = request.params;

            const sql = `
            UPDATE disponibilidades SET
            lcz_id = ?, dsp_dia_semana = ?,
             dsp_horario = ?,  dsp_status = ?
            WHERE
            dsp_id = ?;
            `;

            const values = [ lcz_id, dsp_dia_semana, dsp_horario, dsp_status, id ];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
               return response.status(404).json({
                sucesso: false,
                mensagem: `diponibilidade ${id}não encontrada!`,
                dados: null

               });

            }
            const dados = {
               id,
               dsp_dia_semana,
               dsp_horario,
               dsp_status
            };
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alteração no cadastro de Disponibilidade', 
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
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Exclusão de Disponibilidade', 
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