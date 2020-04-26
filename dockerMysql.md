# 1. Container Docker com Banco de Dados MySQL

Construiremos um container **docker** com banco de dados **MySQL**.

## Comandos Básicos

Comando|Descrição
---|---
docker info| Exibe informações do docker
docker ps| Exibe os containers que estão de pé
docker images| Exibir todas as imagens
docker build| Construir uma imagem
docker run| Rodar um container
docker exec| Executar comando em um container que esta rodando
docker stop| Parando um container
docker start| Reiniciando um container
docker rm | Remover um container
docker rmi | Removendo uma imagem


## Estrutura de Diretórios do Projeto

* /home
* |__ docker-tutorial
 *     |__ api
 *     |__ db
 *     |__ web

## Comando Utilizados
> Criar o arquivo ```Dockerfile ``` na pasta ```db```.

```
# Ir na raiz do projeto 

$ docker build -t mysql-img -f db/Dockerfile .
```

Argumentos | Descrição
---|---
-t | Significa 'tag' e que estamos dando um nome para a imagem
mysql-img | Nome da imagem
-f | Especifica que será informado o arquivo 'Dockerfile' para gerar a imagem
db/Dockerfile | Caminho do arquivo 'Dockerfile'
. (ponto) | Indica que o contexto para gerar a imagem, vai ser da pasta que esta executando o comando no momento

```
# Criar/Rodar o container com base na imagem gerada

$ docker run -d --rm --name mysql-ctr mysql-img
```

Argumentos | Descrição
---|---
-d | Significa detach, onse será executado em background (liberando o terminal para uso)
--rm | Informa que se o caontainer já existir, ele vai ser removido para que um novo possa ser criado
--name | Indica que passaremos o nome para o nosso container
mysql-ctr | Nome do container
mysql-img | Nome da imagem base para a geração do container

```
# Exibir os container 'Ativos'

$ docker ps
```

* Criar o arquivo 'script.sql' na pasta 'db'

```
# Executar comandos em um container 'ativo'.

$ docker exec -i mysql-ctr mysql -uroot -pmysqltest < db/script.sql
```

Argumentos | Descrição
---|---
-i | Indica que estamos executando um comando no modo interativo
mysql-ctr | Container que será utilizado o comando
mysql -uroot -pmysqltest < db/script.sql | Comando que será executado

* Entrando em um container

```
# Executar comandos dentro de um container 'ativo'.

$ docker exec -it mysql-ctr /bin/bash
```

Argumentos | Descrição
---|---
-it | Indica que será utilizado o terminal interativo
mysql-ctr | Nome do container que entraremos
/bin/bash | Comando que queremos executar (neste cado usar o bash)

```
# Dentro de um container 'ativo'.

# mysql -uroot -p

mysql> show databases;
mysql> use db_teste
mysql> show tables;
mysql> select * from products;
mysql> exit

# exit

$ 
```

* Quando um container é parado, tudo dentro dele é perdido.

```
# Parando um container 'ativo'.

$ docker stop mysql-ctr
$ docker ps
$ docker run -d --rm --name mysql-ctr mysql-img
$ docker ps
$ docker exec -it mysql-ctr /bin/bash

#
# mysql -uroot -p

mysql> show databases;
mysql> exit

# exit

$ 
```

* Criando uma pasta externa para uso do container

```
# Parando um container 'ativo'.

$ docker stop mysql-ctr
$ docker ps
$ docker run -d -v $(pwd)/db/data:/var/lib/mysql --rm --name mysql-ctr mysql-img

-v - significa volume, onde temos uma pasta no 'host' compartilhada com o 'container'
$(pwd)/db/data - caminho da pasta externa (host)
: - separador
/var/lib/mysql - caminho da pasta interna (container)

* ----------------------------------------------------------------------------
* Nota: Não é boa prática deixar a pasta do host '-v' dentro da pasta do projeto.
* ----------------------------------------------------------------------------

$ docker ps
$ docker exec -i mysql-ctr mysql -uroot -pmysqltest < db/script.sql
$ <consular a base>
$
$ docker stop mysql-ctr
$ docker ps
$ 
$ docker run -d -v $(pwd)/db/data:/var/lib/mysql --rm --name mysql-ctr mysql-img
$ docker exec -it mysql-ctr /bin/bash
$
$ mysql -uroot -p

mysql> show databases;
mysql> use db_teste;
mysql> show tables;
mysql> select * from products;
mysql> exit

# exit

$ 
```

* Configurar container 'Mysql' para ter conexão externa

```
$ docker stop mysql-ctr
$ docker run -d -v $(pwd)/db/data:/var/lib/mysql -p 3306:3306 --rm --name mysql-ctr mysql-img

# Criar novo usuário e conceder privilégios para o database
$ docker exec -it mysql-ctr /bin/bash

# Dentro do Container
# mysql -uroot -p

# Dentro do MySQL
mysql> create user 'usr_teste'@'%' identified by 'usrteste';
mysql> grant all privileges on db_teste.* to 'usr_teste'@'%’;
mysql> flush privileges;
mysql> select User, Db, Host from mysql.db;
mysql> exit

# exit

$ 
```

> Devido problemas do drive no mysql na biblioteca 'mysql' do 'nodeJS', precisamos efetuar
> a alteração abaixo no MySQL.
> 
```
ALTER USER 'usr_teste'@'%' IDENTIFIED WITH mysql_native_password BY 'usrteste';
```


### < End >

[<< Voltar](README.md)
