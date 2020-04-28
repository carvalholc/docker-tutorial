# Docker Tutorial

Neste tutorial de exemplo, serão criados 3 conteiners **docker**. Um container com o banco de dados **MySQL**, o segundo container com uma **API NodeJS** que efetuará uma consulta em uma tabela do container do banco **_MySQL_** e o terceiro container com **PHP**, que consome da **_API NodeJS_** e direciona o resultado para uma página **_HTML_**.

## Preparar o Ambiente da Aplicação

### 01. Efetuar o Clone do Projeto

```
git clone <link do projeto>
```


### 02. Instalando Dependências do NodeJS

Acesse a pasta `./api` no terminal e execute:
```
npm install
```

Com isso instalamos as dependências do NodeJS que precisamos.
> A versão utilizada do Node foi a [```12.16.2```].

### 03. Construindo as Imagens Docker

Acesse a pasta raíz do projeto e construa cada imagem [ MySQL, Node API e PHP ]:

```
docker build -t mysql-img -f db/Dockerfile .
```
```
docker build -t node-img -f api/Dockerfile .
```
```
docker build -t php-img -f website/Dockerfile .
```

### 04. Rodando os Containers Docker
Na pasta raíz do projeto e crie e rode cada container [ MySQL, Node API e PHP ]:

```
docker run -d -v $(pwd)/db/data:/var/lib/mysql --rm --name mysql-ctr mysql-img
```
```
docker run -d -v $(pwd)/api:/home/node/app -p 9001:9001 --link mysql-ctr --rm --name node-ctr node-img
```
```
docker run -d -v "$(pwd)/website":/var/www/html -p 8888:80 --link node-ctr --rm --name php-ctr php-img
```

### 05. Aplicando Script no Container MySQL

```
docker exec -i mysql-ctr mysql -uroot -pmysqltest < db/script.sql
```

### 06. Criando Usuário e Atribuindo Privilégios no Container MySQL

```
$ docker exec -it mysql-ctr /bin/bash
```

Dentro do Container do MySQL

```
# mysql -uroot -p
```

Dentro do MySQL

```
mysql> create user 'usr_teste'@'%' identified by 'usrteste';
mysql> grant all privileges on db_teste.* to 'usr_teste'@'%';
mysql> flush privileges;
mysql> select User, Db, Host from mysql.db;
mysql> 
```

> Devido problemas do drive no mysql na biblioteca 'mysql' do 'NodeJS', precisamos efetuar
> a alteração abaixo no MySQL. Esta necessidade surgiu apartir do MySQL 8.
> 
```
mysql> ALTER USER 'usr_teste'@'%' IDENTIFIED WITH mysql_native_password BY 'usrteste';
```

### 7. Testando os Containers

Abrir um **Navegador Web** (**_browser_**) e testar os links:

Link | Descrição
---|---
[localhost:9001/products](http://localhost:9001/products) | Link do Container Docker da API NodeJS
[localhost:8888](http://localhost:8888) | Link do Container Docker do PHP retornando uma página html.

## Maiores Detalhes

1. [Container Docker com Banco de Dados MySQL](dockerMysql.md)
1. [Container Docker com API NodeJS](dockerNodejs.md)
1. [Container Docker com PHP](dockerPhp.md)

## Bônus
* [Gerenciando Containers Docker com **DockerCompose**](dockerCompose.md)

Para entender melhor sobre cada comando utilizado, acesse os links acima **;)**
