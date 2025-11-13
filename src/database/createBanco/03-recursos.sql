use bd_tcc_etim_123_g6

SELECT usu_id, usu_nome, usu_email, usu_telefone, usu_senha, usu_cpf, usu_adm, usu_status, usu_imagem, usu_crp FROM usuarios;

SELECT redeapoio_id, redeapoio_nome, redeapoio_descricao, redeapoio_contato, redeapoio_logo, redeapoio_link FROM  redes_apoio;

SELECT pub_id, usu_id, pub_titulo, pub_texto, pub_imagem, pub_data_postagem, pub_status FROM publicacoes;

SELECT lcz_id, usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf FROM localizacoes;
 
SELECT fdbk_id, usu_id, fdbk_mensagem, fdbk_data_hora, fdbk_nota, fdbk_identificacao, fdbk_acesso FROM feedback_consulta;

SELECT esp_id, usu_id, esp_nome FROM especialidades; 

SELECT dsp_id, lcz_id, dsp_dia_semana, dsp_horario, dsp_status FROM disponibilidades;

SELECT agd_id, usu_id, agd_paciente,  agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta FROM agendamentos;

DROP TABLE usuarios;
DROP TABLE redes_apoio;
DROP TABLE publicacoes;
DROP TABLE localizacoes;
DROP TABLE feedback_consulta;
DROP TABLE especialidades;
DROP TABLE disponibilidades;
DROP TABLE agendamentos;


DESCRIBE usuarios;
DESCRIBE redes_apoio;
DESCRIBE publicacoes;
DESCRIBE localizacoes;
DESCRIBE feedback_consulta;
DESCRIBE especialidades;
DESCRIBE disponibilidades;
DESCRIBE agendamentos;


