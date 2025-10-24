USE bd_tcc_etim_123_g6;
INSERT INTO usuarios (usu_nome, usu_email, usu_telefone, usu_senha, usu_data_nascimento, usu_cpf, usu_tipo) VALUES
('Ana Souza', 'ana.souza@email.com', '11987654321', 'senha123', '1995-06-15', '12345678900', 1),
('Carlos Mendes', 'carlos.mendes@email.com', '11976543210', 'segredo99', '1988-12-10', '98765432100', 2),
('Mariana Lima', 'mariana.lima@email.com', '11965498732', 'pass1234', '1990-03-22', '32198765400', 1),
('Roberto Almeida', 'roberto.almeida@email.com', '11954321987', 'roberto@99', '1985-09-08', '78912345600', 2),
('Fernanda Costa', 'fernanda.costa@email.com', '11943219876', 'minhasenha', '1998-07-01', '65432198700', 2),
('Lucas Martins', 'lucas.martins@email.com', '11987651234', 'martins123', '1992-11-20', '32165498700', 2),
('Patrícia Oliveira', 'patricia.oliveira@email.com', '11976549876', 'paty2023', '2000-04-18', '98732165400', 1),
('Daniel Ribeiro', 'daniel.ribeiro@email.com', '11954328765', 'dani@ribeiro', '1987-05-30', '65498732100', 2),
('Juliana Ferreira', 'juliana.ferreira@email.com', '11943217654', 'juliana@123', '1993-10-12', '45678912300', 1),
('Gustavo Nunes', 'gustavo.nunes@email.com', '11932165498', 'gustavo@99', '1989-08-25', '78965432100', 2);

/*igual no vscode */
INSERT INTO redes_apoio 
(redeapoio_nome, redeapoio_descricao, redeapoio_contato, redeapoio_logo, redeapoio_link) 
VALUES
('Centro de Valorização da Vida', 
 'Formado exclusivamente por voluntários, oferece apoio emocional e prevenção do suicídio de forma gratuita. As pessoas que o procuram, em geral, estão se sentindo sozinhas ou precisam conversar com alguém de maneira sigilosa, sem julgamentos, críticas ou comparações. O CVV atua em todo o território nacional, oferecendo atendimento pelo telefone 188 — disponível 24 horas por dia e sem custo de ligação —, além de chat, e-mail e atendimento presencial em alguns endereços. Fundado em 1962, o CVV é uma entidade nacional independente, tanto financeira quanto ideologicamente, sem qualquer vinculação religiosa, político-partidária ou empresarial.', 
 '11987654321', 
 'CVV.png', 
 'https://www.cvv.org.br'),

('Rede Pode Falar', 
 'A Rede Pode Falar nasceu como um canal de escuta acolhedora e transformou-se em uma rede de instituições e pessoas que não apenas oferecem um serviço de apoio emocional e conteúdos confiáveis em saúde mental, mas também capacitam futuros profissionais da área de cuidado humano, sensíveis às necessidades específicas desse ciclo da vida. As instituições que participam desta rede de cuidado, devido à sua especialização e conhecimento neste tema, realizam pesquisas, avaliam programas e fazem recomendações para a melhoria das políticas públicas de saúde mental nesta faixa etária, tanto em âmbito nacional quanto estadual e municipal.', 
 '11976543210', 
 'RPF.png', 
 'https://redepodefalar.org.br'),

('Instituto Bem-Estar', 
 'A Missão do Bem-Estar é uma organização sem fins lucrativos que atua na promoção do bem-estar mental por meio do letramento socioemocional e do advocacy. Tem como foco mulheres, jovens e pessoas LGBTQIAPN+, e busca colaborar para a redução do estigma em saúde mental. Por meio de suas frentes de atuação, promove ações que unem educação emocional, conscientização e impacto social. Na área de Letramento Socioemocional, desenvolve atividades e materiais educativos que auxiliam as pessoas a reconhecer, compreender e gerenciar suas emoções, estimulando o autoconhecimento e o cuidado com a saúde mental. '
 '11998765432', 
 'IBE.png', 
 'https://institutobemestar.org.br'),

('Instituto Vita Alegre', 
 'O Instituto Vita Alegre é uma organização sem fins lucrativos dedicada a oferecer apoio psicológico e social para pessoas em situação de vulnerabilidade, com foco especial em vítimas de violência doméstica. Fundado em 2005, o instituto desenvolve programas de acolhimento, terapia individual e em grupo, além de campanhas de conscientização sobre saúde mental e prevenção da violência. Com uma equipe multidisciplinar de profissionais, o Instituto Vita Alegre busca promover a recuperação emocional e a reintegração social de seus assistidos.', 
 '11954321987', 
 'IVA.png', 
 'https://www.institutovitaalegre.org.br');


INSERT INTO perfil_psicologo ( psi_id, prf_especialidades, prf_biografia, prf_imagem, prf_crp) VALUES
(1,'Terapia de Casal', 'Psicólogo especializado em relações conjugais e conflitos familiares.', 'ana.png', 'CRP-123456'),
(2,'Ansiedade', 'Ajudo pacientes a lidarem com transtornos de ansiedade e estresse.', 120.00, 'CRP-234567'),
(3,'Depressão', 'Experiência no tratamento da depressão e ressignificação emocional.', 130.00, 'CRP-345678'),
(4,'Psicologia Infantil', 'Atendo crianças com dificuldades emocionais e comportamentais.', 140.00, 'CRP-456789'),
(5,'Terapia Cognitivo-Comportamental', 'Utilizo a TCC para tratar diversos transtornos psicológicos.', 125.00, 'CRP-567890'),
(6,'Psicologia Organizacional', 'Especialista em bem-estar no trabalho e desenvolvimento profissional.', 160.00, 'CRP-678901'),
(7,'Dependência Química', 'Atuo no tratamento e reabilitação de pacientes com vícios.', 135.00, 'CRP-789012'),
(8,'Psicologia do Esporte', 'Ajudo atletas a desenvolverem foco e controle emocional.', 145.00, 'CRP-890123'),
(9,'Psicanálise', 'Trabalho com interpretação do inconsciente para autoconhecimento.', 155.00, 'CRP-901234'),
(10,'Neuropsicologia', 'Especialista em avaliação e reabilitação neuropsicológica.', 170.00, 'CRP-012345');



INSERT INTO publicacoes (pub_id, psi_id, pub_titulo, pub_texto, pub_data_postagem, pub_imagem, pub_status) VALUES 
(1, 1, 'A Importância da Terapia de Casal', 
 'Entenda como a terapia pode fortalecer os laços e melhorar a comunicação no relacionamento.', 
 '2025-03-14', 'terapia_casal.jpg', 'ativo'),
(2, 2, 'Ansiedade: Como Identificar e Controlar?', 
 'Dicas essenciais para reconhecer os sintomas da ansiedade e como lidar com eles no dia a dia.', 
 '2025-03-12', 'ansiedade_tips.jpg', 'ativo'),
(3, 3, 'Os Sinais da Depressão', 
 'Conheça os principais sinais da depressão e quando procurar ajuda profissional.', 
 '2025-03-10', 'depressao_sinais.jpg', 'ativo'),
(4, 4, 'Como Ajudar uma Criança a Expressar Emoções', 
 'Estratégias para pais e cuidadores ajudarem as crianças a lidarem com suas emoções.', 
 '2025-03-08', 'psicologia_infantil.jpg', 'ativo'),
(5, 5, 'Terapia Cognitivo-Comportamental: O que é e Como Funciona?', 
 'Saiba como a TCC pode auxiliar no tratamento de diversos transtornos psicológicos.', 
 '2025-03-06', 'tcc_terapia.jpg', 'ativo'),
(6, 6, 'Saúde Mental no Ambiente de Trabalho', 
 'A importância do bem-estar psicológico no desempenho profissional e qualidade de vida.', 
 '2025-03-04', 'psicologia_organizacional.jpg', 'ativo'),
(7, 7, 'Superando a Dependência Química', 
 'Entenda os desafios do tratamento e a importância do apoio psicológico para a recuperação.', 
 '2025-03-02', 'dependencia_quimica.jpg', 'ativo'),
(8, 8, 'Psicologia do Esporte: O Impacto da Mente no Desempenho', 
 'Como atletas podem treinar a mente para melhorar o rendimento esportivo.', 
 '2025-03-01', 'psicologia_esporte.jpg', 'ativo'),
(9, 9, 'Psicanálise: Explorando o Inconsciente', 
 'Descubra como a psicanálise pode ajudar no autoconhecimento e resolução de conflitos internos.', 
 '2025-02-28', 'psicanalise.jpg', 'ativo'),
(10, 10, 'Neuropsicologia e Funções Cognitivas', 
 'Como a neuropsicologia pode auxiliar no diagnóstico e tratamento de distúrbios cognitivos.', 
 '2025-02-26', 'neuropsicologia.jpg', 'ativo');



INSERT INTO localizacoes (psi_id, lcz_nome_clinica, lcz_cep, lcz_bairro, lcz_complemento, lcz_cidade, lcz_estado) 
VALUES
(1, 'Clínica Bem-Estar', '01001-000', 'Centro', 'Sala 101', 'São Paulo', 'SP'),
(2, 'Psicologia Viva', '20031-144', 'Copacabana', 'Bloco B', 'Rio de Janeiro', 'RJ'),
(3, 'Equilíbrio Mental', '30130-009', 'Savassi', 'Edifício Orion', 'Belo Horizonte', 'MG'),
(4, 'Ser Pleno', '40020-220', 'Barra', 'Sala 302', 'Salvador', 'BA'),
(5, 'Mente Saudável', '60140-140', 'Meireles', 'Perto da praça', 'Fortaleza', 'CE'),
(6, 'Psiquê Clínica', '80030-110', 'Batel', 'Andar 5', 'Curitiba', 'PR'),
(7, 'Vida em Harmonia', '69010-000', 'Centro', 'Próximo ao teatro', 'Manaus', 'AM'),
(8, 'Nova Perspectiva', '77006-000', 'Plano Diretor', 'Edifício Cristal', 'Palmas', 'TO'),
(9, 'Consciência Plena', '88015-202', 'Trindade', 'Sala 203', 'Florianópolis', 'SC'),
(10, 'Ser e Viver', '66033-000', 'Umarizal', 'Perto da praça', 'Belém', 'PA');


/*igual no vscode */
INSERT INTO feedback_consulta (psi_id, usu_id, fdbk_mensagem, fdbk_data_hora) 
VALUES
(1, 5, 'Ótimo atendimento! Profissional muito atencioso.', '2025-10-24 10:30:00'),
(2, 3, 'Me senti muito confortável durante a consulta.', '2025-10-24 14:15:00'),
(3, 7, 'Ajudou bastante com minhas questões pessoais.', '22025-10-24 16:45:00'),
(4, 2, 'Terapia incrível! Me fez enxergar novas perspectivas.', '2025-10-24 09:00:00'),
(5, 8, 'Gostei da abordagem, mas esperava um pouco mais de direcionamento.', '22025-10-24 11:20:00'),
(6, 1, 'Muito profissional e acolhedor. Recomendo!', '2025-10-24 15:30:00'),
(7, 4, 'Consulta bem estruturada e eficiente.', '2025-10-24 17:00:00'),
(8, 9, 'Ótima escuta ativa e empatia.', '2025-10-24 13:45:00'),
(9, 6, 'Fiquei mais tranquilo após a consulta, me ajudou bastante.', '22025-10-24 18:10:00'),
(10, 10, 'Me identifiquei muito com o psicólogo, ótima escolha!', '2025-10-24 12:00:00');



INSERT INTO agendamentos (agd_id, psi_id, usu_id, agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta)
VALUES 
(1, 1, 1, '2025-03-15', '10:00:00', '11:00:00', 'Paciente relatou melhoria no quadro de ansiedade.'),
(2, 2, 2, '2025-03-15', '11:30:00', '12:30:00', 'Discussão sobre dificuldades no relacionamento pessoal.'),
(3, 3, 3, '2025-03-16', '14:00:00', '15:00:00', 'Exploração de traumas de infância e como afetam o comportamento atual.'),
(4, 1, 4, '2025-03-16', '09:00:00', '10:00:00', 'Reforço nas técnicas de respiração e relaxamento para controle de estresse.'),
(5, 4, 5, '2025-03-17', '15:00:00', '16:00:00', 'Paciente apresentou dificuldades com a rotina de trabalho.'),
(6, 2, 6, '2025-03-17', '16:30:00', '17:30:00', 'Discutido progresso em relação à gestão de ansiedade.'),
(7, 5, 7, '2025-03-18', '08:00:00', '09:00:00', 'Avaliação de comportamentos relacionados a vícios.'),
(8, 1, 8, '2025-03-18', '13:00:00', '14:00:00', 'Tratamento de distúrbios alimentares e acompanhamento psicológico.'),
(9, 6, 9, '2025-03-19', '10:30:00', '11:30:00', 'Discussão sobre possíveis causas da insônia e métodos para melhora.'),
(10, 3, 10, '2025-03-19', '11:45:00', '12:45:00', 'Paciente demonstrou grande evolução na aceitação das emoções.');



   -- Segunda-feira 
(2, 1, 1, '14:00:00', 1),  -- Segunda-feira
(3, 2, 2, '10:00:00', 1),  -- Terça-feira
(4, 3, 3, '09:30:00', 0),  -- Quarta-feira (Não disponível)
(5, 1, 3, '15:00:00', 1),  -- Quarta-feira
(6, 4, 4, '11:00:00', 1),  -- Quinta-feira
(7, 2, 5, '13:00:00', 0),  -- Sexta-feira (Não disponível)
(8, 3, 6, '08:30:00', 1),  -- Sábado
(9, 5, 7, '16:00:00', 1),  -- Domingo
(10, 4, 7, '18:00:00', 0);  -- Domingo (Não disponível)





