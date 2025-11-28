const db = require('../database/connection'); 
const { gerarUrl } = require('../utils/gerarUrl');

module.exports = {
    async listarUsuarios(request, response) {
        try {
            const sql = `
                SELECT 
                    usu_id, 
                    usu_nome, 
                    usu_email, 
                    usu_telefone, 
                    usu_senha, 
                    usu_cpf, 
                    usu_adm, 
                    usu_status, 
                    usu_imagem, 
                    usu_crp 
                FROM usuarios;
            `;

            const [rows] = await db.query(sql);

            const dados = rows.map(usuario => ({
                ...usuario,
                usu_imagem: gerarUrl(usuario.usu_imagem, 'usuarios', 'default_user.png')
            }));

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de usuários', 
                itens: dados.length,
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

    async cadastrarUsuarios(request, response) {
        try {
            const {
                usu_nome, 
                usu_email, 
                usu_telefone, 
                usu_senha, 
                usu_cpf, 
                usu_adm, 
                usu_status, 
                usu_imagem, 
                usu_crp
            } = request.body;

            // Validação dos campos obrigatórios
            if (!usu_nome || !usu_email || !usu_senha || !usu_cpf || !usu_crp || !usu_imagem) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios faltando!',
                    dados: 'usu_nome, usu_email, usu_senha, usu_cpf, usu_crp e usu_imagem são obrigatórios'
                });
            }

            // Verificar tamanho do CRP (máximo 7 caracteres)
            if (usu_crp.length > 7) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CRP deve ter no máximo 7 caracteres!',
                    dados: null
                });
            }

            // Verificar tamanho do CPF (máximo 11 caracteres)
            if (usu_cpf.length > 11) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CPF deve ter no máximo 11 caracteres!',
                    dados: null
                });
            }

            // Verificar se CRP já existe
            const checkCrpSql = `SELECT usu_id FROM usuarios WHERE usu_crp = ?`;
            const [existingCrp] = await db.query(checkCrpSql, [usu_crp]);
            
            if (existingCrp.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CRP já cadastrado!',
                    dados: null
                });
            }

            // Verificar se CPF já existe
            const checkCpfSql = `SELECT usu_id FROM usuarios WHERE usu_cpf = ?`;
            const [existingCpf] = await db.query(checkCpfSql, [usu_cpf]);
            
            if (existingCpf.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CPF já cadastrado!',
                    dados: null
                });
            }

            // Verificar se email já existe
            const checkEmailSql = `SELECT usu_id FROM usuarios WHERE usu_email = ?`;
            const [existingEmail] = await db.query(checkEmailSql, [usu_email]);
            
            if (existingEmail.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'E-mail já cadastrado!',
                    dados: null
                });
            }

            const sql = `
                INSERT INTO usuarios 
                (usu_nome, usu_email, usu_telefone, usu_senha, usu_cpf, usu_adm, usu_status, usu_imagem, usu_crp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            const values = [
                usu_nome, 
                usu_email, 
                usu_telefone, 
                usu_senha, 
                usu_cpf, 
                usu_adm || 0, 
                usu_status || 'ativo', 
                usu_imagem,
                usu_crp
            ];

            const [result] = await db.query(sql, values);

            const dados = {
                usu_id: result.insertId,
                usu_nome,
                usu_email,
                usu_telefone,
                usu_cpf,
                usu_adm: usu_adm || 0,
                usu_status: usu_status || 'ativo',
                usu_imagem,
                usu_crp
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Usuário cadastrado com sucesso!', 
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

    async editarUsuarios(request, response) {
        try {
            const {
                usu_nome, 
                usu_email, 
                usu_telefone, 
                usu_senha, 
                usu_cpf, 
                usu_adm, 
                usu_status, 
                usu_imagem, 
                usu_crp
            } = request.body;

            const { usu_id } = request.params;

            if (!usu_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID do usuário é obrigatório!',
                    dados: null
                });
            }

            // Validação dos campos obrigatórios
            if (!usu_nome || !usu_email || !usu_senha || !usu_cpf || !usu_crp || !usu_imagem) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios faltando!',
                    dados: 'usu_nome, usu_email, usu_senha, usu_cpf, usu_crp e usu_imagem são obrigatórios'
                });
            }

            // Verificar tamanho do CRP (máximo 7 caracteres)
            if (usu_crp.length > 7) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CRP deve ter no máximo 7 caracteres!',
                    dados: null
                });
            }

            // Verificar tamanho do CPF (máximo 11 caracteres)
            if (usu_cpf.length > 11) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CPF deve ter no máximo 11 caracteres!',
                    dados: null
                });
            }

            // Verificar se o usuário existe
            const checkUserSql = `SELECT usu_id FROM usuarios WHERE usu_id = ?`;
            const [existingUser] = await db.query(checkUserSql, [usu_id]);
            
            if (existingUser.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${usu_id} não encontrado!`,
                    dados: null
                });
            }

            // Verificar se CRP já existe em OUTRO usuário
            const checkCrpSql = `SELECT usu_id FROM usuarios WHERE usu_crp = ? AND usu_id != ?`;
            const [existingCrp] = await db.query(checkCrpSql, [usu_crp, usu_id]);
            
            if (existingCrp.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CRP já está em uso por outro usuário!',
                    dados: null
                });
            }

            // Verificar se CPF já existe em OUTRO usuário
            const checkCpfSql = `SELECT usu_id FROM usuarios WHERE usu_cpf = ? AND usu_id != ?`;
            const [existingCpf] = await db.query(checkCpfSql, [usu_cpf, usu_id]);
            
            if (existingCpf.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CPF já está em uso por outro usuário!',
                    dados: null
                });
            }

            // Verificar se email já existe em OUTRO usuário
            const checkEmailSql = `SELECT usu_id FROM usuarios WHERE usu_email = ? AND usu_id != ?`;
            const [existingEmail] = await db.query(checkEmailSql, [usu_email, usu_id]);
            
            if (existingEmail.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'E-mail já está em uso por outro usuário!',
                    dados: null
                });
            }

            const sql = `
                UPDATE usuarios SET
                    usu_nome = ?, 
                    usu_email = ?, 
                    usu_telefone = ?, 
                    usu_senha = ?, 
                    usu_cpf = ?, 
                    usu_adm = ?, 
                    usu_status = ?, 
                    usu_imagem = ?, 
                    usu_crp = ?
                WHERE usu_id = ?;
            `;

            const values = [
                usu_nome, 
                usu_email, 
                usu_telefone, 
                usu_senha, 
                usu_cpf, 
                usu_adm || 0, 
                usu_status || 'ativo', 
                usu_imagem,
                usu_crp,
                usu_id
            ];

            const [result] = await db.query(sql, values);

            const dados = {
                usu_id: parseInt(usu_id),
                usu_nome,
                usu_email,
                usu_telefone,
                usu_cpf,
                usu_adm: usu_adm || 0,
                usu_status: usu_status || 'ativo',
                usu_imagem,
                usu_crp
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Usuário ${usu_id} atualizado com sucesso!`, 
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

    async apagarUsuarios(request, response) {
        try {
            const { usu_id } = request.params;

            if (!usu_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID do usuário é obrigatório!',
                    dados: null
                });
            }

            const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
            const values = [usu_id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${usu_id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Usuário ${usu_id} excluído com sucesso!`, 
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