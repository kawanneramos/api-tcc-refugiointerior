const db = require('../database/connection');
const { gerarUrl } = require('../utils/gerarUrl');

module.exports = {
    async listarPublicacao(request, response) {
        try {
            const sql = ` 
                SELECT 
                    p.pub_id, 
                    p.usu_id, 
                    p.pub_titulo, 
                    p.pub_texto,
                    p.pub_data_postagem, 
                    p.pub_imagem, 
                    p.pub_status,
                    -- Dados do usuário
                    u.usu_nome,
                    u.usu_email,
                    u.usu_telefone,
                    u.usu_cpf,
                    u.usu_adm,
                    u.usu_status as usu_status,
                    u.usu_imagem,
                    u.usu_crp
                FROM publicacoes p
                LEFT JOIN usuarios u ON p.usu_id = u.usu_id
                WHERE p.pub_status = 'ativo'
                ORDER BY p.pub_data_postagem DESC;
            `;
            
            const [rows] = await db.query(sql);

            const dados = rows.map(publicacao => ({
                ...publicacao,
                pub_imagem: gerarUrl(
                    publicacao.pub_imagem,
                    'publicacoes',
                    'pub1img.jpg', 'pub2img.jpg', 'pub3img.png', 'pub4img.png',
                    'pub5img.webp', 'pub6img.webp', 'pub7img.jpg', 'pub8img.png',
                    'pub9img.webp', 'pub10img.webp'
                ),
                usu_imagem: gerarUrl(
                    publicacao.usu_imagem,
                    'usuarios',
                    'avatarPadrao.png'
                ),
                // Formatar data
                pub_data_postagem_formatada: new Date(publicacao.pub_data_postagem).toLocaleDateString('pt-BR'),
                // Identificar se é psicólogo
                is_psicologo: publicacao.usu_adm === 0
            }));

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Publicações', 
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

    async listarPsicologos(request, response) {
        try {
            const sql = ` 
                SELECT 
                    usu_id,
                    usu_nome,
                    usu_email,
                    usu_telefone,
                    usu_cpf,
                    usu_status,
                    usu_imagem,
                    usu_crp,
                    -- Contar publicações
                    (SELECT COUNT(*) FROM publicacoes p WHERE p.usu_id = u.usu_id) as total_publicacoes
                FROM usuarios u
                WHERE u.usu_adm = 0  -- 0 = psicólogo conforme seu schema
                AND u.usu_status = 'ativo'
                ORDER BY u.usu_nome;
            `;
            
            const [rows] = await db.query(sql);

            const dados = rows.map(psicologo => ({
                ...psicologo,
                usu_imagem: gerarUrl(
                    psicologo.usu_imagem,
                    'usuarios',
                    'avatarPadrao.png'
                ),
                // Formatar CRP (06/XXXXX)
                usu_crp_formatado: psicologo.usu_crp ? `${psicologo.usu_crp.substring(0, 2)}/${psicologo.usu_crp.substring(2)}` : null
            }));

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Psicólogos', 
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

    async cadastrarPublicacao(request, response) {
        try {
            const {
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
                pub_imagem, 
                pub_status 
            } = request.body;

            // Validações
            if (!usu_id || !pub_titulo || !pub_texto || !pub_data_postagem) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios faltando!',
                    dados: 'usu_id, pub_titulo, pub_texto e pub_data_postagem são obrigatórios'
                });
            }

            // Verificar se usuário existe
            const checkUserSql = `SELECT usu_id, usu_nome FROM usuarios WHERE usu_id = ? AND usu_status = 'ativo'`;
            const [user] = await db.query(checkUserSql, [usu_id]);
            
            if (user.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado ou inativo!',
                    dados: null
                });
            }

            const sql = `
                INSERT INTO publicacoes 
                (usu_id, pub_titulo, pub_texto, pub_data_postagem, pub_imagem, pub_status) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            
            const values = [
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
                pub_imagem || null, 
                pub_status || 'ativo'
            ];
            
            const [result] = await db.query(sql, values);
            
            // Buscar dados completos da publicação criada
            const selectSql = `
                SELECT p.*, u.usu_nome, u.usu_imagem 
                FROM publicacoes p
                LEFT JOIN usuarios u ON p.usu_id = u.usu_id
                WHERE p.pub_id = ?
            `;
            const [newPub] = await db.query(selectSql, [result.insertId]);
            
            const dados = {
                ...newPub[0],
                pub_imagem: gerarUrl(
                    newPub[0].pub_imagem,
                    'publicacoes',
                    'pub1img.jpg'
                ),
                usu_imagem: gerarUrl(
                    newPub[0].usu_imagem,
                    'usuarios',
                    'avatarPadrao.png'
                )
            };

            return response.status(201).json({
                sucesso: true, 
                mensagem: 'Publicação cadastrada com sucesso!', 
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

    async editarPublicacao(request, response) {
        try {
            const {
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
                pub_imagem, 
                pub_status 
            } = request.body;
            
            const { pub_id } = request.params;

            if (!pub_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da publicação é obrigatório!',
                    dados: null
                });
            }

            const sql = `
                UPDATE publicacoes SET
                    usu_id = ?, 
                    pub_titulo = ?, 
                    pub_texto = ?,
                    pub_data_postagem = ?, 
                    pub_imagem = ?, 
                    pub_status = ? 
                WHERE pub_id = ?;            
            `;
            
            const values = [
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
                pub_imagem || null, 
                pub_status || 'ativo', 
                pub_id
            ];
            
            const [result] = await db.query(sql, values);

            if(result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: `Publicação ${pub_id} não encontrada!`, 
                    dados: null
                });
            }

            const dados = {
                pub_id: parseInt(pub_id),
                usu_id,
                pub_titulo, 
                pub_texto, 
                pub_data_postagem,
                pub_imagem, 
                pub_status
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Publicação ${pub_id} atualizada com sucesso!`, 
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

    async apagarPublicacao(request, response) {
        try {
            const { pub_id } = request.params;

            if (!pub_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da publicação é obrigatório!',
                    dados: null
                });
            }

            const sql = `DELETE FROM publicacoes WHERE pub_id = ?`;
            const values = [pub_id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Publicação ${pub_id} não encontrada!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Publicação ${pub_id} excluída com sucesso!`, 
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

