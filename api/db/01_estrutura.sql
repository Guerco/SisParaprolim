CREATE DATABASE IF NOT EXISTS bd_paraprolim
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE bd_paraprolim; 

CREATE TABLE IF NOT EXISTS cep (
    cep CHAR(8) PRIMARY KEY,
    logradouro VARCHAR(200),
    bairro VARCHAR(200),
    cidade VARCHAR(200),
    uf CHAR(2)
    -- , criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS  atleta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num_cad CHAR(6) UNIQUE,
    nome VARCHAR(200) NOT NULL,
    data_nascimento DATE,
    uf_nascimento CHAR(2),
    sexo ENUM('M','F') NOT NULL,
    estado_civil CHAR(1),
    data_admissao DATE DEFAULT (CURRENT_DATE),
    telefone_1 VARCHAR(11),
    telefone_2 VARCHAR(11),
    email VARCHAR(100),
    nis CHAR(11) UNIQUE,
    cpf CHAR(11) NOT NULL UNIQUE,
    org_expedidor_documento VARCHAR(50),
    uf_registro_documento CHAR(2),
    data_expedicao_documento DATE,
    nome_mae VARCHAR(200),
    nome_pai VARCHAR(200),
    responsavel VARCHAR(20),
    cpf_responsavel CHAR(11),
    end_cep CHAR(8),
    end_logradouro VARCHAR(200),
    end_numero VARCHAR(20),
    end_complemento VARCHAR(200),
    end_bairro VARCHAR(200),
    end_cidade VARCHAR(200),
    end_uf CHAR(2),
    validade_termo_imagem DATE,
    validade_atestado DATE,
    cuidados_especiais VARCHAR(300),
    esta_ativo BOOLEAN DEFAULT TRUE
    -- , criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=INNODB;

-- CREATE TABLE IF NOT EXISTS contato_atleta (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     atleta_id INT NOT NULL,
--     telefone CHAR(11),
--     email VARCHAR(100),
--     tipo VARCHAR(50),
--     -- , criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     -- atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
--     FOREIGN KEY (atleta_id) REFERENCES atleta(id),
-- ) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS modalidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL UNIQUE
    -- , criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS atleta_modalidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    classe VARCHAR(100),
    atleta_id INT NOT NULL,
    modalidade_id INT NOT NULL,
    FOREIGN KEY (atleta_id) REFERENCES atleta(id),
    FOREIGN KEY (modalidade_id) REFERENCES modalidade(id),
    UNIQUE (atleta_id, modalidade_id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS tipo_deficiencia (
    tipo CHAR(2) PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS deficiencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cid_10 VARCHAR(10) NOT NULL UNIQUE,
    tipo_deficiencia CHAR(2),
    descricao_deficiencia VARCHAR(200),
    FOREIGN KEY (tipo_deficiencia) REFERENCES tipo_deficiencia(tipo)    
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS atleta_deficiencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    atleta_id INT NOT NULL,
    deficiencia_id INT NOT NULL,
    FOREIGN KEY (atleta_id) REFERENCES atleta(id),  
    FOREIGN KEY (deficiencia_id) REFERENCES deficiencia(id),
    UNIQUE (atleta_id, deficiencia_id)  
) ENGINE=INNODB;


