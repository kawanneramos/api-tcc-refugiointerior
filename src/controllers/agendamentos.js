const db = require('../database/connection');
const { gerarUrl } = require('../utils/gerarUrl');
module.exports = {
    async listarAgendamento(request, response) {
        try {

           const sql = `
           SELECT agd_id, usu_id, agd_paciente,  agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta 
           FROM agendamentos;
           `;
           const [ rows] = await db.query(sql);

          

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Agendamento', 
                nItens,
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





    async cadastrarAgendamento(request, response) {
        try {

            const {usu_id, data_consulta,inicio_consulta,fim_consulta, 
                   anotacoes_consulta}  = request.body;
             const sql = `
                      INSERT INTO agendamentos 
                (usu_id, agd_paciente, agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta)
             VALUES 
              (?, ?, ?, ?, ?, ?)
             `;

             const values = [usu_id, data_consulta,inicio_consulta,fim_consulta, anotacoes_consulta];

             const [result] = await db.query(sql, values);

             const dados = {
                agd_id: result.insertId,
                usu_id, 
                data_consulta,
                inicio_consulta,
                fim_consulta, 
                anotacoes_consulta
             };
             
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de Agendamento', 
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




    async editarAgendamento(request, response) {
        try {

            const {usu_id, data_consulta, inicio_consulta, fim_consulta, anotacoes_consulta}  = request.body;
            const { agd_id } = request.params;
            const sql = `
            UPDATE agendamentos SET
               usu_id =?, agd_data_consulta=?, agd_inicio_consulta=?, 
           agd_fim_consulta=?, agd_anotacoes_consulta =?
           WHERE
             agd_id = ?;
       `;
       const values = [usu_id, data_consulta, inicio_consulta, fim_consulta, anotacoes_consulta, agd_id];


       const [result] = await db.query(sql, values);

       

       if (result.affectedRows === 0){
        return response.status(404).json({
            sucesso:false,
            mensagem: `Agendamento ${agd_id} não encontrado!`,
            dados:null
        });
       }

       const dados = {
          agd_id ,
          usu_id, 
          data_consulta,
          inicio_consulta,
          fim_consulta, 
          anotacoes_consulta
       };


            return response.status(200).json({
                sucesso: true, 
                mensagem: `Alteração no Agendamento ${agd_id} atualizada com sucesso!`, 
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
















    async apagarAgendamento(request, response) {
        try {

            const {agd_id} = request.params;
            const sql = `DELETE FROM agendamentos WHERE agd_id = ?`;
            const values = [agd_id];
            const [result] = await db.query(sql,values);
   
            if (result.affectedRows ===0){
               return response.status(404).json({
                      sucesso: false,
                      mensagem:`Agendamento ${agd_id} não encontrado!`,
                      dados:null
   
               });
            }
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Agendamento ${agd_id} excluido com sucesso`, 
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