SELECT usu_id, usu_nome, usu_email, usu_telefone, usu_senha, usu_data_nascimento, usu_cpf, usu_tipo FROM usuarios;
SELECT redeapoio_id, redeapoio_nome, redeapoio_descricao, redeapoio_contato, redeapoio_logo, redeapoio_link FROM redes_apoio;
SELECT psi_id, prf_especialidades, prf_biografia, prf_imagem, prf_crp FROM perfil_psicologo;
SELECT pub_id, psi_id, pub_titulo, pub_texto, pub_data_postagem, pub_imagem, pub_status FROM publicacoes;
SELECT lcz_id, psi_id, lcz_nome_clinica, lcz_cep, lcz_bairro, lcz_complemento, lcz_cidade, lcz_estado FROM localizacoes;
SELECT fdbk_id, psi_id, usu_id, fdbk_mensagem, fdbk_data_hora FROM feedback_consulta;
SELECT agd_id, psi_id, usu_id, agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta FROM agendamentos;
SELECT dsp_id, lcz_id, dsp_dia_semana, dsp_horario, dsp_status FROM disponibilidades;



DROP TABLE usuarios;
DROP TABLE redes_apoio;
DROP TABLE perfil_psicologo;
DROP TABLE publicacoes;
DROP TABLE localizacoes;
DROP TABLE feedback_consulta;
DROP TABLE agendamentos;
DROP TABLE disponibilidades;


DESCRIBE usuarios;
DESCRIBE redes_apoio;
DESCRIBE perfil_psicologo;
DESCRIBE publicacoes;
DESCRIBE localizacoes;
DESCRIBE feedback_consulta;
DESCRIBE agendamentos;
DESCRIBE disponibilidades;

