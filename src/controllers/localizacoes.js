const db = require('../database/connection');
const { gerarUrl } = require('../utils/gerarUrl');

module.exports = {
    // ---------- LISTAR ----------
    async listarLocalizacoes(request, response) {
        try {
            const sql = `
                SELECT lcz_id, usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, 
                       lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf 
                FROM localizacoes;
            `;

            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de localizações',
                dados: rows,
                itens: rows.length
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },


    // ---------- CADASTRAR ----------
    async cadastrarLocalizacoes(request, response) {
        try {
            const {
                usu_id,
                lcz_nome_clinica,
                lcz_cep,
                lcz_logradouro,
                lcz_complemento,
                lcz_bairro,
                lcz_localidade,
                lcz_uf
            } = request.body;

            const sql = `
                INSERT INTO localizacoes 
                (usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, 
                 lcz_bairro, lcz_localidade, lcz_uf)  
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;

            const values = [
                usu_id,
                lcz_nome_clinica,
                lcz_cep,
                lcz_logradouro,
                lcz_complemento,
                lcz_bairro,
                lcz_localidade,
                lcz_uf
            ];

            const [result] = await db.query(sql, values);

            const dados = {
                lcz_id: result.insertId,
                usu_id,
                lcz_nome_clinica,
                lcz_cep,
                lcz_logradouro,
                lcz_complemento,
                lcz_bairro,
                lcz_localidade,
                lcz_uf
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de localização realizado com sucesso',
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



    // ---------- EDITAR ----------
    async editarLocalizacoes(request, response) {
        try {
            const {
                usu_id,
                lcz_nome_clinica,
                lcz_cep,
                lcz_logradouro,
                lcz_complemento,
                lcz_bairro,
                lcz_localidade,
                lcz_uf
            } = request.body;

            const { lcz_id } = request.params;

            const sql = `
                UPDATE localizacoes SET 
                    usu_id = ?, 
                    lcz_nome_clinica = ?, 
                    lcz_cep = ?, 
                    lcz_logradouro = ?, 
                    lcz_complemento = ?, 
                    lcz_bairro = ?, 
                    lcz_localidade = ?,  
                    lcz_uf = ?
                WHERE lcz_id = ?;
            `;

            const values = [
                usu_id,
                lcz_nome_clinica,
                lcz_cep,
                lcz_logradouro,
                lcz_complemento,
                lcz_bairro,
                lcz_localidade,
                lcz_uf,
                lcz_id // ← FALTAVA ESSE
            ];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Localização ${lcz_id} não encontrada!`,
                    dados: null
                });
            }

            const dados = {
                lcz_id,
                usu_id,
                lcz_nome_clinica,
                lcz_cep,
                lcz_logradouro,
                lcz_complemento,
                lcz_bairro,
                lcz_localidade,
                lcz_uf
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: `Localização ${lcz_id} atualizada com sucesso!`,
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



    // ---------- APAGAR ----------
    async apagarLocalizacoes(request, response) {
        try {
            const { lcz_id } = request.params;

            const sql = `DELETE FROM localizacoes WHERE lcz_id = ?`;
            const values = [lcz_id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Localização ${lcz_id} não encontrada!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Localização ${lcz_id} excluída com sucesso`,
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
