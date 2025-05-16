const db = require('../dataBase/connection'); 

module.exports = {
    async listarDisponibilidades(request, response) {
        try {
            const sql = `
             
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

             const {lcz_id, dia_semana, horario, status} = request.body;
             
             const sql = `
             INSERT INTO disponibilidades 
             (lcz_id, dsp_dia_semana, dsp_horario, dsp_status)
              VALUES
                (?,?,?,?);
            `;
            const values = [lcz_id, dia_semana, horario, status];
            
            const [result] = await db.query(sql, values);

            const dados = {
                dsp_id: result.insertId,
                dia_semana,
                horario,
                status
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
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alteração no cadastro de Disponibilidade', 
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