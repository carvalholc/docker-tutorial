
CREATE DATABASE IF NOT EXISTS db_teste;

USE db_teste;

CREATE TABLE IF NOT EXISTS products (
    id int(11) AUTO_INCREMENT,
    name VARCHAR(255),
    price DECIMAL(10,2),
    PRIMARY KEY (id)
);

INSERT INTO products VALUES (0, 'Curso Front-End Especialista', 2500);
INSERT INTO products VALUES (0, 'Curso JS FullStack', 900);

-- Criar usuário da aplicação e conceder privilégios
CREATE USER 'usr_teste'@'%' IDENTIFIED BY 'usrteste';
GRANT SELECT, INSERT, UPDATE, DELETE ON db_teste.* TO 'usr_teste'@'%';
FLUSH PRIVILEGES;
ALTER USER 'usr_teste'@'%' IDENTIFIED WITH mysql_native_password BY 'usrteste';
