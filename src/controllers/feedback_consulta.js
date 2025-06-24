const db = require('../dataBase/connection'); 

module.exports = {
    async listarFeedback_consulta(request, response) {
        try {

            const sql = `
            SELECT fdbk_id, psi_id, usu_id, fdbk_mensagem, 
            fdbk_data_hora 
            FROM feedback_consulta;
            `;

            const [rows] = await db.query(sql);
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de feedback_consulta',
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
    async cadastrarFeedback_consulta(request, response) {
        try {

            const { psi_id, usu_id, mensagem, data_hora } = request.body;
      
            const sql = `
           INSERT INTO feedback_consulta (psi_id, usu_id, fdbk_mensagem, fdbk_data_hora) 
                VALUES
                (?, ?, ?, ?);
             `;

             const values = [psi_id, usu_id, mensagem, data_hora];

             const [result] = await db.query(sql, values);

             const dados = {
                fdbk_id: result.insertId,
                mensagem,
                data_hora
             };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de feedback_consulta', 
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
    async editarFeedback_consulta(request, response) {
        try {

                const { psi_id, usu_id, mensagem, data_hora } = request.body;
    
                const { fdbk_id } = request.params;
    
                const sql = `
                UPDATE feedback_consulta SET
                 psi_id = ?, usu_id = ?, fdbk_mensagem = ?, fdbk_data_hora = ?
                 WHERE fdbk_id = ?;
                 `;
    
                 const values = [ psi_id, usu_id, mensagem, data_hora, fdbk_id ];
    
                 const [result] = await db.query(sql, values);
    
                 if (result.affectedRows === 0) {
                    return response.status(404).json({
                        sucesso: false,
                        mensagem: `Feedback_consulta ${fdbk_id} não encontrado!`,
                        dados: null
                    });
                 }
    
                 const dados = {
                    fdbk_id,
                    mensagem,
                    data_hora
                 };
    
                return response.status(200).json({
                    sucesso: true, 
                    mensagem: `Feedback_consulta ${fdbk_id} atualizado com sucesso!`, 
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
    async apagarFeedback_consulta(request, response) {
        try {

            const { fdbk_id } = request.params;

            const sql = `DELETE FROM feedback_consulta WHERE fdbk_id = ?`;

            const values = [fdbk_id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Feedback_consulta ${fdbk_id} não encontrado!`,
                    dados: null
                });
             }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Feedback_consulta ${fdbk_id} excluído com sucesso!`, 
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