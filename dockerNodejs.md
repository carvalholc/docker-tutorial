
# 2. Docker com API NodeJS

Construiremos um container **docker** com uma **API NodeJS** que consulta um outro container **docker** com o bando **MySQL**.

> **Nota:** É importante que a versão do __NodeJs__ instalado na máquuina host, deve ser igual a versão do __NodeJS__ instalado no __container docker__.

## Estrutura de Diretórios do Projeto

* /home
* |__ docker-tutorial
 *     |__ api
 *     |__ db
 *     |__ web

## Comando Utilizados

* Criar o arquivo **Dockerfile** na pasta ```api```

```
# Ir na raiz do projeto
$ mkdir api
$ cd api

$ npm init -y

$ npm install --save-dev nodemon

$ npm install --save express mysql

```

* Adicionar no arqiov **.gitignore** a pasta ```node_modules``` e o arquivo ```package-lock.json```.

* Adicionar no arquivo **package.json** o item ```start``` dentro do elemento ```script```.

```
...
"start": "nodemon ./src/index"
...
```

* Crir a pasta ```src``` com o arquivo **index.js**

> Para obter o ```host``` do MySQL, devemos obter o IP do container do MySQL. Onde ambos precisam estar na mesma rede.
> Para obter o IP do container **MySQL**, executar o comando ```docker inspect mysql-ctr``` e procure por __IPAddress__.
> Com o IP preencher o ```host``` do arquivo 'index.js' 

* Criar a imagem e o container da aplicação

```
# [1]. Criar o arquivo Dockerfile ( na pasta 'api' )
# [2]. Criar a imagem ( raiz do projeto )

$ docker build -t node-img -f api/Dockerfile .

# [3]. Rodar a imagem dentro de um container

$ docker run -d -v $(pwd)/api:/home/node/app -p 9001:9001 --rm --name node-ctr node-img

```

> **Nota:** Caso na execução do comando ```docker build``` retornar o erro:
> 
> ```error checking context: 'can't stat '/home/.../db/data/#innodb_temp''```
>
> Para solucionar, apagar a pasta 'data' e executar o ```docker build``` novamente.
> 
> ```$ sudo rm -Rf data```
> ```$ docker build -t node-img -f api/Dockerfile .```
> 

* Tastar no browser: http://localhost:9001/products

### < End >

[<< Voltar](README.md)