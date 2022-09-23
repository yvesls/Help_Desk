CREATE DATABASE help_desk;

CREATE TABLE tb_chamados (
    id int NOT NULL AUTO_INCREMENT,
    nome char(30) NOT NULL,
    categoria char(30) NOT NULL,
    titulo varchar(30) NOT NULL,
    descricao text NOT NULL,
    status char(20) NOT NULL,
    data_mod varchar(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tb_chamados (
    id int NOT NULL AUTO_INCREMENT,
    nome char(30) NOT NULL,
    destino char(30) NOT NULL,
    mensagem text NOT NULL,
    datadoenvio varchar(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tb_endereco (
    id int NOT NULL AUTO_INCREMENT,
    nome char(30) NOT NULL,
    cep int(8) NOT NULL,
    endereco varchar(30) NOT NULL,
    bairro varchar(20) NOT NULL,
    cidade char(30) NOT NULL,
    uf char(2) NOT NULL,
    complemento varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE usuarios (
    id int NOT NULL AUTO_INCREMENT,
    nome char(30) NOT NULL,
    email varchar(30) NOT NULL,
    senha varchar(20) NOT NULL,
    PRIMARY KEY (id)
);