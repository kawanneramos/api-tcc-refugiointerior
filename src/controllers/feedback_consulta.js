const db = require('../database/connection'); 
const { gerarUrl } = require('../utils/gerarUrl');

module.exports = {
    async listarFeedback_consulta(request, response) {
        try {

            const sql = `
          SELECT fdbk_id, usu_id, fdbk_mensagem, fdbk_data_hora, fdbk_nota, fdbk_identificacao, fdbk_acesso 
          FROM feedback_consulta;
            `;

            const [rows] = await db.query(sql);

             // ALTERNATIVA SEM MEXER COM TODOS OS CAMPOS
            const dados = rows.map(ingrediente => ({
                ...ingrediente,
                ing_img: gerarUrl(ingrediente.ing_img, 'ingredientes', 'sem.jpg')
            }));

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de feedback_consulta',
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
    async cadastrarFeedback_consulta(request, response) {
        try {

            const {usu_id, fdbk_mensagem, data_hora } = request.body;
      
            const sql = `
           INSERT INTO feedback_consulta 
            (usu_id, fdbk_mensagem, fdbk_data_hora, fdbk_nota, fdbk_identificacao, fdbk_acesso) 
            VALUES
                (?, ?, ?, ?, ?, ?);
             `;

             const values = [psi_id, usu_id, fdbk_mensagem, data_hora];

             const [result] = await db.query(sql, values);

             const dados = {
                fdbk_id: result.insertId,
                fdbk_mensagem,
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

                const {usu_id, fdbk_mensagem, data_hora } = request.body;
    
                const { fdbk_id } = request.params;
    
                const sql = `
                UPDATE feedback_consulta SET
                  usu_id = ?, fdbk_mensagem = ?, fdbk_data_hora = ?
                 WHERE fdbk_id = ?;
                 `;
    
                 const values = [usu_id, fdbk_mensagem, data_hora, fdbk_id ];
    
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
                    fdbk_mensagem,
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