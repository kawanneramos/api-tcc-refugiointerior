const db = require('../database/connection');
const { gerarUrl } = require('../utils/gerarUrl');

module.exports = {
    async listarPublicacao(request, response) {
        try {
            console.log('📋 Listando publicações...');
            
            const sql = ` 
                SELECT 
                    p.pub_id, 
                    p.usu_id, 
                    p.pub_titulo, 
                    p.pub_texto,
                    p.pub_data_postagem, 
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
            console.log(`✅ Encontradas ${rows.length} publicações`);

            const dados = rows.map(publicacao => ({
                ...publicacao,
                // Foto do autor (usuário)
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
            console.error('❌ Erro ao listar publicações:', error);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao carregar publicações', 
                dados: error.message
            });
        }
    }, 

    async cadastrarPublicacao(request, response) {
        try {
            console.log('📝 Recebendo nova publicação:', request.body);
            
            const {
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
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
            const checkUserSql = `SELECT usu_id, usu_nome FROM usuarios WHERE usu_id = ?`;
            const [user] = await db.query(checkUserSql, [usu_id]);
            
            if (user.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado!',
                    dados: null
                });
            }

            const sql = `
                INSERT INTO publicacoes 
                (usu_id, pub_titulo, pub_texto, pub_data_postagem, pub_status) 
                VALUES (?, ?, ?, ?, ?)
            `;
            
            const values = [
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
                pub_status || 'ativo'
            ];
            
            const [result] = await db.query(sql, values);
            console.log(`✅ Publicação criada com ID: ${result.insertId}`);
            
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
                usu_imagem: gerarUrl(
                    newPub[0].usu_imagem,
                    'usuarios',
                    'avatarPadrao.png'
                )
            };

            return response.status(201).json({
                sucesso: true, 
                mensagem: 'Publicação criada com sucesso!', 
                dados: dados
            });
        } catch (error) {
            console.error('❌ Erro ao criar publicação:', error);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao criar publicação', 
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
                    pub_status = ? 
                WHERE pub_id = ?;            
            `;
            
            const values = [
                usu_id, 
                pub_titulo, 
                pub_texto, 
                pub_data_postagem, 
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
                pub_status: pub_status || 'ativo'
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Publicação ${pub_id} atualizada com sucesso!`, 
                dados
            });
        } catch (error) {
            console.error('❌ Erro ao editar publicação:', error);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao editar publicação', 
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
            console.error('❌ Erro ao apagar publicação:', error);
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro ao excluir publicação', 
                dados: error.message
            });
        }
    }
};