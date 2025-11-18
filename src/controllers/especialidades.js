const db = require('../dataBase/connection'); 

module.exports = {
    async listarEspecialidades(request, response) {

        try {

            const sql = `
            SELECT esp_id, usu_id, esp_nome
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

            const {usu_id, esp_nome} = request.body;
      
            const sql = `
                INSERT INTO especialidades (usu_id, esp_nome) VALUES
                (?, ?);
             `;

             const values = [usu_id, esp_nome];

             const [result] = await db.query(sql, values);

             const dados = {
                esp_nome
             };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de Especialidades', 
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

            const {usu_id, esp_nome} = request.body;

            const {esp_id} = request.params;

            const sql = `
            UPDATE especialidades SET
             usu_id = ?, esp_nome = ?
            WHERE esp_id = ?;
             `;

             const values = [usu_id, esp_nome];

             const [result] = await db.query(sql, values);

             if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Especialidades ${esp_id} não encontrado!`,
                    dados: null
                });
             }

             const dados = {
                esp_nome
             };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Especialidades ${esp_id} atualizado com sucesso!`, 
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

            const {esp_id} = request.params;

            const sql = `DELETE FROM especialidades WHERE esp_id = ?`;

            const values = [esp_id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Especialidades ${esp_id} não encontrado!`,
                    dados: null
                });
             }

             return response.status(500).json({
                sucesso: true, 
                mensagem: `Especialidades ${esp_id} excluído com sucesso!`,
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