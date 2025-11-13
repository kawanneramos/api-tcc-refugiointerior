show tables

INSERT INTO usuarios 
(usu_nome, usu_email, usu_telefone, usu_senha, usu_cpf, usu_adm, usu_status, usu_imagem, usu_crp) VALUES
('Mariana Lima dos Santos', 'marianalima.7093@gmail.com', '(11)98765-4321', 'Limamariana@43', '12345678901', 0, 'ativo', 'mariana.png', '0612345'),
('Letícia Almeida Ferreira', 'leticia_ferreira52@gmail.com', '(11)99005-7552', '1234Leticia@', '23456789012', 0, 'ativo', 'leticia.png', '0467890'),
('João Pereira', 'joao.perreira@gmail.com', '(21)3401-2453', 'JoaoP#789', '34567890123', 0, 'aguardando aprovação', 'joao.png', '0567890'),
('Camila Ribeiro Nunes', 'camila.nunes@gmail.com', '(51)2090-0344', 'Camilan!321', '45678901234', 0, 'inativo', 'camila.png', '0713579'),
('Bruno Ferreira Costa', 'bruno.costa@gmail.com', '(71)1030-0972', 'costaNunes$654', '56789012345', 0, 'ativo', 'bruno.png', '0612345'),
('Fernanda Maria Souza', 'fernanda.souza@example.com', '(61)99876-5544', 'Camilan!987', '67890123456', 0, 'ativo', 'fernanda.png', '0733456'),
('Lucas Pereira Santos', 'lucas.pereira@example.com', '(71)97788-6655', 'Camilan!321159', '78901234567', 0, 'ativo', 'lucas.png', '0955678'),
('Amanda Ribeiro Duarte', 'amanda.ribeiro@example.com', '(81)98899-7766', 'Camilan!321753', '89012345678', 0, 'ativo', 'amanda.png', '1202294'),
('Thiago Luís Martins', 'thiago.martins@example.com', '(91)99911-8877', 'Camilan!321852', '90123456789', 0, 'ativo', 'thiago.png', '1066789'),
('Beatriz Helena Nunes', 'beatriz.nunes@example.com', '(85)97654-9988', 'Camilan!951', '01234567890', 0, 'ativo', 'beatriz.png', '0932456');

ALTER TABLE redes_apoio MODIFY redeapoio_descricao TEXT;
ALTER TABLE redes_apoio MODIFY redeapoio_contato VARCHAR(50) NULL;



SELECT usu_id, usu_nome, usu_email, usu_telefone, usu_senha, usu_cpf, usu_adm, usu_status, usu_imagem, usu_crp FROM usuarios;

INSERT INTO redes_apoio 
(redeapoio_nome, redeapoio_descricao, redeapoio_contato, redeapoio_logo, redeapoio_link) VALUES

('Centro de Valorização da Vida', 
 'Formado exclusivamente por voluntários, oferece apoio emocional e prevenção do suicídio de forma gratuita. As pessoas que o procuram, em geral, estão se sentindo sozinhas ou precisam conversar com alguém de maneira sigilosa, sem julgamentos, críticas ou comparações. O CVV atua em todo o território nacional, oferecendo atendimento pelo telefone 188 — disponível 24 horas por dia e sem custo de ligação —, além de chat, e-mail e atendimento presencial em alguns endereços. Fundado em 1962, o CVV é uma entidade nacional independente, tanto financeira quanto ideologicamente, sem qualquer vinculação religiosa, político-partidária ou empresarial.', 
 '188',  'CVV.png',  'https://www.cvv.org.br'),

('Rede Pode Falar', 
 'A Rede Pode Falar nasceu como um canal de escuta acolhedora e transformou-se em uma rede de instituições e pessoas que não apenas oferecem um serviço de apoio emocional e conteúdos confiáveis em saúde mental, mas também capacitam futuros profissionais da área de cuidado humano, sensíveis às necessidades específicas desse ciclo da vida. As instituições que participam desta rede de cuidado, devido à sua especialização e conhecimento neste tema, realizam pesquisas, avaliam programas e fazem recomendações para a melhoria das políticas públicas de saúde mental nesta faixa etária, tanto em âmbito nacional quanto estadual e municipal.', 
 '(61) 9660-8843', 'RPF.png', 'https://redepodefalar.org.br'),

('Instituto Bem-Estar', 
 'A Missão do Bem-Estar é promover a saúde mental por meio de programas e atendimentos acessíveis a toda população.', NULL, 'IBE.png', 'https://institutobemestar.org.br'),

('Instituto Vita Alegre', 
 'O Instituto Vita Alegre é uma organização sem fins lucrativos dedicada a oferecer apoio psicológico e social para pessoas em situação de vulnerabilidade, com foco especial em vítimas de violência doméstica. Fundado em 2005, o instituto desenvolve programas de acolhimento, terapia individual e em grupo, além de campanhas de conscientização sobre saúde mental e prevenção da violência. Com uma equipe multidisciplinar de profissionais, o Instituto Vita Alegre busca promover a recuperação emocional e a reintegração social de seus assistidos.', 
 '(11) 97647-0989', 'IVA.png',  'https://www.institutovitaalegre.org.br');
 SELECT redeapoio_id, redeapoio_nome, redeapoio_descricao, redeapoio_contato, redeapoio_logo, redeapoio_link FROM  redes_apoio;
 
INSERT INTO publicacoes 
(usu_id, pub_titulo, pub_texto, pub_data_postagem, pub_imagem, pub_status) 
VALUES
(11, 'Entendendo a Ansiedade', 
'A ansiedade é uma emoção natural e essencial para a sobrevivência humana. Ela funciona como um alerta do corpo diante de situações que envolvem perigo, incerteza ou estresse, preparando o organismo para reagir a ameaças reais ou imaginárias. Em níveis moderados, pode ser positiva, ajudando na concentração, no foco e na tomada de decisões. No entanto, quando se torna constante ou desproporcional aos estímulos, pode evoluir para um transtorno de ansiedade. Nesses casos, surgem sintomas como palpitações, insônia, preocupação excessiva e sensação de perda de controle. Entender a ansiedade é o primeiro passo para lidar melhor com ela. Procurar apoio psicológico, praticar atividades físicas, manter uma rotina equilibrada e desenvolver técnicas de relaxamento são estratégias que ajudam a reduzir seus impactos e promover o bem-estar emocional.', 
'2025-11-03', 'pub1img.png', 'ativo'),

(12, 'Técnicas de Relaxamento', 
'As técnicas de relaxamento são ferramentas eficazes para reduzir o estresse e controlar a ansiedade no dia a dia. Uma das mais conhecidas é a respiração profunda: sente-se confortavelmente, inspire lentamente pelo nariz contando até quatro, segure o ar por mais quatro segundos e expire pela boca contando até seis. Repita por cinco minutos e perceba como o corpo relaxa gradualmente. Outras práticas, como alongamentos, meditação guiada e mindfulness, também ajudam a desacelerar os pensamentos e aliviar tensões. O ideal é incluir essas técnicas na rotina, especialmente em momentos de sobrecarga emocional. Criar um ambiente calmo, ouvir músicas suaves e se desconectar das telas por alguns minutos pode potencializar os efeitos. Pequenas pausas diárias são grandes aliadas para o equilíbrio mental e o cuidado com a saúde emocional.', 
'2025-11-03', 'pub2img.png', 'ativo'),

(13, 'Saúde mental em números', 
'A saúde mental é um dos maiores desafios da nossa época. De fato, o ritmo acelerado da vida, o excesso de telas, a pressão por produtividade, a instabilidade econômica e formas de intolerância como bullying, preconceito e racismo, tornam o cenário ainda mais grave. Ansiedade: O Brasil lidera o ranking global, com mais de 18 milhões de pessoas afetadas, aproximadamente 9,3% da população. Depressão: 5,8% da população brasileira, cerca de 11,5 milhões de pessoas, sofre de depressão, registrando assim o maior índice da América Latina. Afastamentos do trabalho: Para ilustrar, em 2024 os afastamentos laborais alcançaram o maior nível da última década, com um aumento de 67% em comparação a 2023, totalizando quase meio milhão de licenças.', 
'2025-11-03', 'pub3img.png', 'ativo'),

(14, 'Estigma x Discriminação', 
'O estigma é uma marca social que faz uma pessoa ser excluída ou vista como inferior pelos outros, diminuindo seu valor dentro do grupo ao qual pertence. Ele está ligado a atitudes e comportamentos negativos, especialmente contra pessoas com problemas de saúde mental ou de uso de substâncias. Em muitos casos, o estigma pode causar mais sofrimento e riscos do que a própria condição de saúde. Já a discriminação é uma ação ou decisão que trata alguém de forma injusta por causa de características como raça, origem, cor, religião, sexo, idade ou deficiência. Pessoas com transtornos mentais que sofrem discriminação enfrentam dificuldades para conseguir e manter emprego, ter moradia segura e acessar serviços de saúde. Além disso, o preconceito e o tratamento desigual afetam suas relações com a família, os amigos e a comunidade, aumentando o isolamento e a exclusão social.', 
'2025-11-03', 'pub4img.png', 'ativo'),

(15, 'O papel da mente na conquista de metas', 
'Manter uma boa saúde mental, tanto dentro quanto fora da escola, depende de uma rotina de autocuidado. Esse autocuidado não se limita apenas às atividades diárias voltadas para o bem-estar físico e emocional, mas também envolve a forma como criamos e lidamos com nossas metas e objetivos. É importante acreditar em nossas capacidades, mas também reconhecer o valor dos aprendizados que surgem durante o processo, inclusive aqueles que vêm das falhas e dos erros. Muitas vezes, o medo de errar ou se frustrar leva as pessoas a imaginar situações negativas que talvez nunca aconteçam, o que gera autossabotagem e faz com que desistam de seus próprios sonhos. Por isso, para quem quer alcançar suas metas sem prejudicar a saúde mental, é essencial adotar uma postura mais gentil e menos crítica consigo mesmo. Além disso, é fundamental valorizar as pequenas vitórias, confiar no processo e compreender que os erros também fazem parte do crescimento e do aprendizado.', 
'2025-11-03', 'pub5img.png', 'ativo'),

(16, 'Autocuidado: o primeiro passo para o bem-estar', 
'Praticar o autocuidado é mais do que reservar um tempo para si; é um compromisso com o equilíbrio emocional, físico e mental. Isso inclui dormir bem, alimentar-se de forma saudável, realizar atividades físicas e estabelecer limites em relações e responsabilidades. Muitas pessoas negligenciam o autocuidado por acreditarem que é um luxo, mas ele é uma necessidade. Cuidar de si é uma forma de preservar a saúde mental e fortalecer a resiliência diante das pressões cotidianas. O autocuidado também envolve reconhecer e respeitar as próprias emoções, permitindo-se sentir sem culpa. Ao criar hábitos saudáveis e realistas, é possível reduzir o estresse, melhorar o humor e aumentar a qualidade de vida. Afinal, cuidar de si mesmo é o primeiro passo para cuidar do mundo ao redor.', 
'2025-11-03', 'pub6img.png', 'ativo'),

(17, 'Como lidar com o estresse diário', 
'O estresse é uma reação natural do corpo, mas quando se torna constante, pode prejudicar a saúde física e mental. Identificar suas causas é essencial para controlá-lo. Uma boa estratégia é organizar as tarefas do dia a dia, estabelecer prioridades e incluir momentos de pausa. Exercícios físicos, técnicas de respiração e contato com a natureza ajudam a aliviar a tensão. Outro ponto importante é cultivar relações saudáveis e buscar apoio quando necessário. O acompanhamento psicológico também pode oferecer ferramentas para compreender e gerenciar melhor o estresse. Aprender a desacelerar é um desafio, mas é essencial para viver com mais leveza e equilíbrio.', 
'2025-11-03', 'pub7img.png', 'ativo'),

(18, 'A importância da escuta empática', 
'Ouvir com empatia é uma das habilidades mais valiosas nas relações humanas. Ela vai além de simplesmente escutar palavras: envolve compreender sentimentos, respeitar o tempo do outro e evitar julgamentos. Na prática psicológica e no convívio social, a escuta empática fortalece vínculos e promove acolhimento. Quando alguém se sente ouvido e compreendido, há uma redução do sofrimento emocional e aumento da confiança. Para desenvolver essa habilidade, é importante praticar a presença genuína, manter o foco no diálogo e demonstrar interesse real. A empatia não exige soluções imediatas, mas sim disponibilidade e sensibilidade para estar com o outro em sua dor ou alegria.', 
'2025-11-03', 'pub8img.png', 'ativo'),

(19, 'Sinais de que é hora de buscar ajuda psicológica', 
'Nem sempre é fácil reconhecer o momento de procurar ajuda profissional. No entanto, alguns sinais indicam que a saúde mental precisa de atenção: tristeza persistente, perda de prazer em atividades, insônia, irritabilidade, crises de ansiedade ou sensação constante de esgotamento. Quando esses sintomas interferem na rotina ou nos relacionamentos, é hora de buscar um psicólogo. A terapia oferece um espaço seguro para compreender emoções, desenvolver estratégias de enfrentamento e resgatar o equilíbrio emocional. Cuidar da mente é tão importante quanto cuidar do corpo. Procurar ajuda não é sinal de fraqueza, e sim de coragem e amor-próprio.', 
'2025-11-03', 'pub9img.png', 'ativo'),

(20, 'Mindfulness: vivendo o presente', 
'O mindfulness, ou atenção plena, é uma prática que convida a mente a estar totalmente presente no momento, sem julgamentos. Ele ajuda a reduzir a ansiedade, melhorar a concentração e fortalecer o autoconhecimento. A técnica pode ser aplicada em atividades simples do cotidiano, como comer, caminhar ou respirar conscientemente. Ao direcionar o foco para o agora, diminuímos o impacto de pensamentos negativos sobre o passado ou preocupações com o futuro. Praticar mindfulness regularmente favorece a regulação emocional e o bem-estar geral. Pequenos momentos de presença podem transformar a forma como lidamos com a vida, trazendo mais calma e clareza mental.', 
'2025-11-03', 'pub10img.png', 'ativo');
SELECT * FROM publicacoes;

INSERT INTO localizacoes 
(usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf)  
VALUES
(11, 'Clínica Vida Plena', '13015-120', 'Rua Barão de Jaguara, 1020', 'Sala 302', 'Centro', 'Campinas', 'SP'),
(12, 'Espaço Equilíbrio Mental', '04004-020', 'Rua Vergueiro, 1455', 'Conjunto 804', 'Paraíso', 'São Paulo', 'SP'),
(13, 'Clínica Bem-Estar', '30130-002', 'Rua da Bahia, 950', '2º andar', 'Centro', 'Belo Horizonte', 'MG'),
(14, 'PsiCare Terapias Integradas', '90010-001', 'Avenida Borges de Medeiros, 312', 'Sala 507', 'Centro Histórico', 'Porto Alegre', 'RS'),
(15, 'Instituto Mente Serena', '40020-000', 'Avenida Sete de Setembro, 1200', 'Sala 1101', 'Campo Grande', 'Salvador', 'BA'),
(16, 'Clínica Psicovida', '88015-200', 'Rua Felipe Schmidt, 456', 'Sala 503', 'Centro', 'Florianópolis', 'SC'),
(17, 'Espaço Terapêutico Harmonia', '80010-180', 'Rua XV de Novembro, 215', 'Sala 305', 'Centro', 'Curitiba', 'PR'),
(18, 'Clínica Alma Livre', '64000-220', 'Avenida Frei Serafim, 875', 'Sala 207', 'Centro', 'Teresina', 'PI'),
(19, 'Centro Psi Evoluir', '69005-040', 'Rua Joaquim Nabuco, 322', 'Sala 402', 'Centro', 'Manaus', 'AM'),
(20, 'Viver Psicologia e Saúde', '66035-000', 'Avenida Nazaré, 1001', 'Sala 301', 'Nazaré', 'Belém', 'PA');

SELECT lcz_id, usu_id, lcz_nome_clinica, lcz_cep, lcz_logradouro, lcz_complemento, lcz_bairro, lcz_localidade, lcz_uf FROM localizacoes;


INSERT INTO feedback_consulta 
(usu_id, fdbk_mensagem, fdbk_data_hora, fdbk_nota, fdbk_identificacao, fdbk_acesso) VALUES

(11, 'A consulta foi excelente. O psicólogo me ajudou a entender melhor minha ansiedade e me passou técnicas práticas para lidar com ela.', '2025-11-03 14:00:00', 5, 'Rafaela Souza', 'Acesso liberado ao psicólogo responsável.'),
(12, 'Achei a sessão produtiva, mas senti que o tempo foi curto para abordar todos os assuntos que eu queria.', '2025-11-03 14:15:00', 5, 'Carlos Alberto', 'Acesso permitido ao psicólogo da consulta.'),
(13, 'A profissional foi muito atenciosa e acolhedora. Saí da consulta mais tranquila e confiante.', '2025-11-03 14:30:00', 5, 'Lucas Martins', 'Acesso concedido ao psicólogo.'),
(14, 'O seu profissionalismo e empatia tornam a terapia muito eficaz e reconfortante.', '2025-11-03 14:45:00', 5, 'Marcos Vinícius', 'Acesso liberado.'),
(15, 'Gostei bastante do atendimento online, foi pontual e direto. Me senti confortável durante toda a conversa.', '2025-11-03 15:00:00', 5, 'Gustavo Andrade', 'Acesso permitido ao psicólogo da consulta.'),
(16, 'Me sinto muito mais leve após nossas sessões. Agradeço por toda atenção e compreensão.', '2025-11-03 15:15:00', 5, 'Joana Figueiredo', 'Acesso permitido ao psicólogo da consulta.'),
(17, 'Achei a consulta esclarecedora.', '2025-11-03 15:30:00', 5, 'Camila Torres', 'Acesso liberado.'),
(18, 'Adorei cada sessão', '2025-11-03 15:45:00', 5, 'Larissa Costa', 'Acesso permitido ao psicólogo da consulta.'),
(19, 'A psicóloga foi muito empática e me fez perceber coisas que eu não havia notado antes. Excelente atendimento.', '2025-11-03 16:00:00', 5, 'Tatiane Souza', 'Acesso permitido ao psicólogo da consulta.'),
(20, 'O atendimento foi muito bom e especial', '2025-11-03 16:15:00', 5, 'Isabela Martins', 'Acesso permitido ao psicólogo da consulta.');
SELECT fdbk_id, usu_id, fdbk_mensagem, fdbk_data_hora, fdbk_nota, fdbk_identificacao, fdbk_acesso FROM feedback_consulta;

INSERT INTO especialidades (usu_id, esp_nome) VALUES
(11, 'Psicologia Clínica, Psicologia Escolar e Educacional'),
(12, 'Psicologia Clínica'),
(13, 'Psicologia Clínica, Psicologia em Saúde'),
(14, 'Psicologia Clínica, Psicopedagogia'),
(15, 'Psicologia Clínica'),
(16, 'Psicologia Clínica, Psicologia em Saúde'),
(17, 'Psicologia Clínica'),
(18, 'Psicologia Clínica, Psicologia Organizacional e do Trabalho'),
(19, 'Psicologia Clínica'),
(20, 'Psicologia Clínica, Psicologia Hospitalar');

SELECT esp_id, usu_id, esp_nome FROM especialidades; 

SELECT dsp_id, lcz_id, dsp_dia_semana, dsp_horario, dsp_status FROM disponibilidades;

SELECT agd_id, usu_id, agd_paciente,  agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta FROM agendamentos;

INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES

-- Psicólogo 1 – Clínica Vida Plena (lcz_id = 1)
(1, 'Segunda-feira', '08:00:00', 1),
(1, 'Segunda-feira', '09:00:00', 1),
(1, 'Segunda-feira', '11:00:00', 1),
(1, 'Segunda-feira', '17:00:00', 1),
(1, 'Terça-feira', '00:00:00', 0), -- Indisponível, horário fictício
(1, 'Quarta-feira', '13:00:00', 1),
(1, 'Quarta-feira', '15:00:00', 1),
(1, 'Quarta-feira', '17:00:00', 1),
(1, 'Quinta-feira', '00:00:00', 0),
(1, 'Sexta-feira', '00:00:00', 0),
(1, 'Sábado', '13:00:00', 1),
(1, 'Sábado', '14:00:00', 1),
(1, 'Sábado', '15:00:00', 1);

INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES

-- Psicólogo 2 – Espaço Equilíbrio Mental (lcz_id = 2)
(2, 'Segunda-feira', '09:00:00', 1),
(2, 'Segunda-feira', '10:00:00', 1),
(2, 'Segunda-feira', '14:00:00', 1),
(2, 'Segunda-feira', '16:00:00', 1),
(2, 'Terça-feira', '00:00:00', 0),
(2, 'Quarta-feira', '08:00:00', 1),
(2, 'Quarta-feira', '09:00:00', 1),
(2, 'Quarta-feira', '10:00:00', 1),
(2, 'Quinta-feira', '13:00:00', 1),
(2, 'Quinta-feira', '14:00:00', 1),
(2, 'Sexta-feira', '00:00:00', 0),
(2, 'Sábado', '09:00:00', 1),
(2, 'Sábado', '10:00:00', 1),
(2, 'Sábado', '11:00:00', 1);

INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES

-- Psicólogo 3 – Clínica Bem-Estar (lcz_id = 3)
(3, 'Segunda-feira', '00:00:00', 0),
(3, 'Terça-feira', '14:00:00', 1),
(3, 'Terça-feira', '15:00:00', 1),
(3, 'Terça-feira', '16:00:00', 1),
(3, 'Quarta-feira', '08:00:00', 1),
(3, 'Quarta-feira', '09:00:00', 1),
(3, 'Quinta-feira', '00:00:00', 0),
(3, 'Sexta-feira', '10:00:00', 1),
(3, 'Sexta-feira', '11:00:00', 1),
(3, 'Sexta-feira', '13:00:00', 1),
(3, 'Sexta-feira', '15:00:00', 1),
(3, 'Sábado', '00:00:00', 0);

INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES

-- Psicólogo 4 – Porto Alegre - RS
(4, 'Segunda-feira', '07:00:00', 1),
(4, 'Segunda-feira', '08:00:00', 1),
(4, 'Segunda-feira', '09:00:00', 1),
(4, 'Quarta-feira', '14:00:00', 1),
(4, 'Quarta-feira', '15:00:00', 1),
(4, 'Quarta-feira', '16:00:00', 1),
(4, 'Quinta-feira', '08:00:00', 1),
(4, 'Quinta-feira', '09:00:00', 1),
(4, 'Quinta-feira', '10:00:00', 1),
(4, 'Quinta-feira', '11:00:00', 1),
(4, 'Sábado', '13:00:00', 1),
(4, 'Sábado', '14:00:00', 1),
(4, 'Sábado', '15:00:00', 1);

INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES

-- Psicólogo 5 – Salvador - BA
(5, 'Segunda-feira', '10:00:00', 1),
(5, 'Segunda-feira', '11:00:00', 1),
(5, 'Segunda-feira', '13:00:00', 1),
(5, 'Terça-feira', '08:00:00', 1),
(5, 'Terça-feira', '09:00:00', 1),
(5, 'Terça-feira', '10:00:00', 1),
(5, 'Quinta-feira', '15:00:00', 1),
(5, 'Quinta-feira', '16:00:00', 1),
(5, 'Quinta-feira', '17:00:00', 1),
(5, 'Sexta-feira', '08:00:00', 1),
(5, 'Sexta-feira', '09:00:00', 1),
(5, 'Sexta-feira', '10:00:00', 1);

INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES

-- Psicólogo 6 – Curitiba - PR
(6, 'Segunda-feira', '09:00:00', 1),
(6, 'Segunda-feira', '10:00:00', 1),
(6, 'Segunda-feira', '11:00:00', 1),
(6, 'Quarta-feira', '13:00:00', 1),
(6, 'Quarta-feira', '14:00:00', 1),
(6, 'Quarta-feira', '15:00:00', 1),
(6, 'Sexta-feira', '08:00:00', 1),
(6, 'Sexta-feira', '09:00:00', 1),
(6, 'Sexta-feira', '10:00:00', 1);

INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES

-- Psicólogo 7 – Recife - PE
(7, 'Segunda-feira', '08:00:00', 1),
(7, 'Segunda-feira', '09:00:00', 1),
(7, 'Segunda-feira', '10:00:00', 1),
(7, 'Terça-feira', '13:00:00', 1),
(7, 'Terça-feira', '14:00:00', 1),
(7, 'Quinta-feira', '09:00:00', 1),
(7, 'Quinta-feira', '10:00:00', 1),
(7, 'Quinta-feira', '11:00:00', 1),
(7, 'Sábado', '08:00:00', 1),
(7, 'Sábado', '09:00:00', 1);

INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES

-- Psicólogo 8 – Fortaleza - CE
(8, 'Segunda-feira', '14:00:00', 1),
(8, 'Segunda-feira', '15:00:00', 1),
(8, 'Segunda-feira', '16:00:00', 1),
(8, 'Quarta-feira', '09:00:00', 1),
(8, 'Quarta-feira', '10:00:00', 1),
(8, 'Quarta-feira', '11:00:00', 1),
(8, 'Sexta-feira', '13:00:00', 1),
(8, 'Sexta-feira', '14:00:00', 1),
(8, 'Sábado', '10:00:00', 1),
(8, 'Sábado', '11:00:00', 1);

INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES

-- Psicólogo 9 – Brasília - DF

(9, 'Segunda-feira', '07:00:00', 1),
(9, 'Segunda-feira', '08:00:00', 1),
(9, 'Segunda-feira', '09:00:00', 1),
(9, 'Quarta-feira', '14:00:00', 1),
(9, 'Quarta-feira', '15:00:00', 1),
(9, 'Quarta-feira', '16:00:00', 1),
(9, 'Quinta-feira', '09:00:00', 1),
(9, 'Quinta-feira', '10:00:00', 1),
(9, 'Sábado', '08:00:00', 1),
(9, 'Sábado', '09:00:00', 1),
(9, 'Sábado', '10:00:00', 1);
INSERT INTO disponibilidades (lcz_id, dsp_dia_semana, dsp_horario, dsp_status) VALUES


-- Psicólogo 10 – Florianópolis - SC

(10, 'Segunda-feira', '09:00:00', 1),
(10, 'Segunda-feira', '10:00:00', 1),
(10, 'Segunda-feira', '11:00:00', 1),
(10, 'Segunda-feira', '12:00:00', 1),
(10, 'Quarta-feira', '13:00:00', 1),
(10, 'Quarta-feira', '14:00:00', 1),
(10, 'Quinta-feira', '08:00:00', 1),
(10, 'Quinta-feira', '09:00:00', 1),
(10, 'Sábado', '09:00:00', 1),
(10, 'Sábado', '10:00:00', 1),
(10, 'Sábado', '11:00:00', 1);

INSERT INTO agendamentos 
(usu_id, agd_paciente, agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta)
VALUES
(11, 'Rafaela Souza', '2025-11-04', '09:00:00', '09:50:00', 'Paciente relatou ansiedade e dificuldade para dormir.'),
(11, 'Amanda Beatriz', '2025-11-04', '10:00:00', '10:50:00', 'Sessão voltada à autoestima e autoconfiança.'),

(12, 'Carlos Alberto', '2025-11-05', '09:00:00', '09:50:00', 'Primeira sessão, foco em autoconhecimento.'),
(12, 'Fernanda Oliveira', '2025-11-05', '10:00:00', '10:50:00', 'Discussão sobre relacionamento interpessoal.'),

(13, 'Lucas Martins', '2025-11-06', '09:00:00', '09:50:00', 'Paciente em processo de adaptação no trabalho.'),
(13, 'Juliana Ribeiro', '2025-11-06', '10:00:00', '10:50:00', 'Retorno, avaliar progresso com técnicas de relaxamento.'),

(14, 'Marcos Vinícius', '2025-11-07', '09:00:00', '09:50:00', 'Apresentou melhora no controle da impulsividade.'),
(14, 'Beatriz Lima', '2025-11-07', '10:00:00', '10:50:00', 'Relatou dificuldade em lidar com pressão escolar.'),

(15, 'Gustavo Andrade', '2025-11-08', '09:00:00', '09:50:00', 'Primeira consulta, queixa de falta de motivação.'),
(15, 'Patrícia Gomes', '2025-11-08', '10:00:00', '10:50:00', 'Sessão voltada à autoestima e autoconfiança.'),

(16, 'Joana Figueiredo', '2025-11-09', '09:00:00', '09:50:00', 'Paciente trouxe questões sobre equilíbrio emocional no trabalho.'),
(16, 'Bruno Henrique', '2025-11-09', '10:00:00', '10:50:00', 'Relatou estresse constante devido à rotina intensa.'),

(17, 'Camila Torres', '2025-11-10', '09:00:00', '09:50:00', 'Primeira sessão, objetivo é melhorar comunicação interpessoal.'),
(17, 'Ricardo Alves', '2025-11-10', '10:00:00', '10:50:00', 'Paciente apresentou avanços no controle da ansiedade.'),

(18, 'Larissa Costa', '2025-11-11', '09:00:00', '09:50:00', 'Sessão voltada para desenvolvimento de autoconfiança.'),
(18, 'Felipe Mendes', '2025-11-11', '10:00:00', '10:50:00', 'Relatou dificuldade em manter foco nos estudos.'),

(19, 'Tatiane Souza', '2025-11-12', '09:00:00', '09:50:00', 'Primeira consulta, queixa principal: insônia recorrente.'),
(19, 'Eduardo Lima', '2025-11-12', '10:00:00', '10:50:00', 'Sessão de acompanhamento, relatou progresso significativo.'),

(20, 'Isabela Martins', '2025-11-13', '09:00:00', '09:50:00', 'Paciente apresentou melhora na organização emocional.'),
(20, 'Rogério Carvalho', '2025-11-13', '10:00:00', '10:50:00', 'Sessão com foco em autoconhecimento e autocontrole.');

 
