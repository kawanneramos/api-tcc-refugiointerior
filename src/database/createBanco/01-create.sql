-- tabela usuarios
create table usuarios (
    usu_id int primary key auto_increment,
    usu_nome varchar(80) not null,
    usu_email varchar(100) not null,
    usu_telefone varchar(20),
    usu_senha varchar(255) not null,
    usu_data_nascimento date,
    usu_cpf varchar(11) unique,
    usu_tipo tinyint not null -- 0-psicólogo, 1-outro tipo de usuário
);

-- tabela perfil_psicologo
create table perfil_psicologo (
    psi_id int primary key auto_increment,
    prf_especialidades varchar(200),
    prf_biografia varchar(200),
    prf_preco_consulta decimal(6,2),
    prf_crp varchar(20) not null
);

-- tabela agendamentos
create table agendamentos (
    agd_id int primary key auto_increment,
    usu_id int not null,
    psi_id int not null,
    agd_data_consulta date not null,
    agd_inicio_consulta time not null,
    agd_fim_consulta time not null,
    agd_anotacoes_consulta varchar(2000),
    foreign key (usu_id) references usuarios(usu_id),
    foreign key (psi_id) references perfil_psicologo(psi_id)
);

-- tabela publicacoes
create table publicacoes (
    pub_id int primary key auto_increment,
    psi_id int not null,
    pub_titulo varchar(100) not null,
    pub_texto varchar(8000) not null,
    pub_data_postagem date not null,
    pub_imagem varchar(500),
    pub_status varchar(50) not null,
    foreign key (psi_id) references perfil_psicologo(psi_id)
);

-- tabela localizacoes
create table localizacoes (
    lcz_id int primary key auto_increment,
    psi_id int not null,
    lcz_nome_clinica varchar(100) not null,
    lcz_cep varchar(30) not null,
    lcz_bairro varchar(60) not null,
    lcz_complemento varchar(60),
    lcz_cidade varchar(60) not null,
    lcz_estado varchar(60) not null,
    foreign key (psi_id) references perfil_psicologo(psi_id)
);

-- tabela disponibilidades
create table disponibilidades (
    dsp_id int primary key auto_increment,
    lcz_id int not null,
    dsp_dia_semana tinyint not null, -- 0 a 6 (domingo a sábado)
    dsp_horario time not null,
    dsp_status tinyint not null,
    foreign key (lcz_id) references localizacoes(lcz_id)
);

-- tabela feedback_consulta
create table feedback_consulta (
    fdbk_id int primary key auto_increment,
    psi_id int not null,
    usu_id int not null,
    fdbk_mensagem varchar(200) not null,
    fdbk_data_hora datetime not null,
    foreign key (psi_id) references perfil_psicologo(psi_id),
    foreign key (usu_id) references usuarios(usu_id)
);

-- tabela redes_apoio
create table redes_apoio (

    redeapoio_id int primary key auto_increment,
    redeapoio_nome varchar(100) not null,
    redeapoio_descricao varchar(200),
    redeapoio_contato varchar(20) not null,
    redeapoio_logo varchar(55)
);
-- tabela comentarios
create table comentarios (
    com_id int primary key auto_increment,
    pub_id int not null,
    usu_id int not null,
    com_texto varchar(200) not null,
    com_moderacao varchar(200),
    foreign key (pub_id) references publicacoes(pub_id),
    foreign key (usu_id) references usuarios(usu_id)
);
