-- tabela usuarios
create table usuarios (
    usu_id int primary key auto_increment,
    usu_nome varchar(80) not null,
    usu_email varchar(100) not null,
    usu_telefone varchar(20),
    usu_senha varchar(255) not null,
    usu_cpf varchar(11) unique not null,
    usu_adm tinyint not null, -- 0-psicólogo, 1-outro tipo de usuário
    usu_status varchar(55) not null, -- ativo, inativo e aguardando aprovação
    usu_imagem varchar(255)not null, -- nome da imagem(como ta salvo)
    usu_crp varchar(7)not null
);

-- tabela agendamentos
create table agendamentos (
    agd_id int primary key auto_increment,
    usu_id int not null,
    agd_paciente varchar(200) not null,
    agd_data_consulta date not null,
    agd_inicio_consulta time not null,
    agd_fim_consulta time not null,
    agd_anotacoes_consulta varchar(5000),
    foreign key (usu_id) references usuarios(usu_id),
    
-- tabela publicacoes
create table publicacoes (
    pub_id int primary key auto_increment,
    usu_id int not null,
    pub_titulo varchar(100) not null,
    pub_texto text not null,
    pub_data_postagem date not null,
    pub_imagem varchar(255),
    pub_status varchar(50) not null,
   foreign key (usu_id) references usuarios(usu_id),

);

-- tabela localizacoes
create table localizacoes (
    lcz_id int primary key auto_increment,
    usu_id int not null,
    lcz_nome_clinica varchar(100) not null,
    lcz_cep varchar(9) not null,
    lcz_logradouro varchar(100) not null,
    lcz_bairro varchar(100) not null,
    lcz_complemento varchar(100),
    lcz_localidade varchar(100) not null,
    lcz_uf char(2) not null,
    foreign key (usu_id) references usuarios(usu_id),

);

-- tabela disponibilidades
create table disponibilidades (
    dsp_id int primary key auto_increment,
    lcz_id int not null,
    dsp_dia_semana varchar(50) not null, -- 0 a 6 (domingo a sábado)
    dsp_horario time not null,
    dsp_status tinyint not null,
    foreign key (lcz_id) references localizacoes(lcz_id)
);

-- tabela feedback_consulta
create table feedback_consulta (
    fdbk_id int primary key auto_increment,
    usu_id int not null,
    fdbk_mensagem varchar(1000) not null,
    fdbk_data_hora datetime not null,
    fdbk_nota tinyint not null,
    fdbk_identificacao varchar(200) not null,
    fdbk_acesso varchar(200) not null,
    foreign key (usu_id) references usuarios(usu_id)
);

-- tabela redes_apoio
create table redes_apoio (

    redeapoio_id int primary key auto_increment,
    redeapoio_nome varchar(100) not null,
    redeapoio_descricao varchar(200),
    redeapoio_contato varchar(20) not null,
    redeapoio_link varchar(255) not null
    redeapoio_logo varchar(255)
);

-- tabela especialidades
create table especialidades (

    esp_id int primary key auto_increment,
    usu_id int not null auto_increment,
    esp_nome varchar(200) not null,
    foreign key (usu_id) references usuarios(usu_id)

    
);


