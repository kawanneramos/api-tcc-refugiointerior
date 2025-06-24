const db = require('../dataBase/connection'); 

module.exports = {
    async listarPerfil_psicologo(request, response) {

        try {

            const sql = `
            SELECT psi_id, prf_especialidades, prf_biografia, prf_preco_consulta,
             prf_crp 
             FROM perfil_psicologo;
            `;

            const [rows] = await db.query(sql);
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de perfil_psicologo', 
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
    async cadastrarPerfil_psicologo(request, response) {
        try {

            const { especialidades, biografia, preco_consulta, crp } = request.body;
      
            const sql = `
                INSERT INTO perfil_psicologo 
            (prf_especialidades, prf_biografia, prf_preco_consulta, prf_crp) 
             VALUES
                (?, ?, ?, ?);
             `;

             const values = [especialidades, biografia, preco_consulta, crp];

             const [result] = await db.query(sql, values);

             const dados = {
                psi_id: result.insertId,
                especialidades,
                biografia,
                preco_consulta,
                crp
             };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de perfil_psicologo', 
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
    async editarPerfil_psicologo(request, response) {
        try {

            const { especialidades, biografia, preco_consulta, crp } = request.body;

            const { psi_id } = request.params;

            const sql = `
            UPDATE perfil_psicologo SET
             prf_especialidades = ?, prf_biografia = ?, prf_preco_consulta = ?, prf_crp = ?
            WHERE psi_id = ?;
             `;

             const values = [ especialidades, biografia, preco_consulta, crp, psi_id ];

             const [result] = await db.query(sql, values);

             if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Perfil_psicologo ${psi_id} não encontrado!`,
                    dados: null
                });
             }

             const dados = {
                psi_id,
                especialidades,
                biografia,
                preco_consulta,
                crp
             };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Perfil_psicologo ${psi_id} atualizado com sucesso!`, 
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
    async apagarPerfil_psicologo(request, response) {
        try {

            const { psi_id } = request.params;

            const sql = `DELETE FROM perfil_psicologo WHERE psi_id = ?`;

            const values = [psi_id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Perfil_psicologo ${psi_id} não encontrado!`,
                    dados: null
                });
             }

             return response.status(500).json({
                sucesso: true, 
                mensagem: `Perfil_psicologo ${psi_id} excluído com sucesso!`,
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