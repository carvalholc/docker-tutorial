# Gerenciando Containers Docker com **DockerCompose**

O **Docker Compose** ou simplesmente **Compose** é uma ferramenta para definir e executar aplicatições que tenham vários contêineres **Docker**. Com o _Compose_, temos um arquivo **YAML** para configurar todos os serviços necessários para uma aplicação. Em seguida, com um único comando, podemos criar e iniciar todos os serviços que foram definidos no arquivo **YAML** de configuração.

## Preparar o Ambiente da Aplicação com Docker Compose

### 01. Criar o Arquivo de Configuração

Na pasta raiz do projeto criar o arquivo **docker-compose.yml**

> Neste arquivo adicionamos todos os serviços que precisamos criar e iniciar, para atender nossa alicação.

### 02. Criando e Iniciando Todos os Serviços

Na pasta raiz do projeto executar o comando:

```
$ docker-compose up -d

Creating network "docker-tutorial_default" with the default driver
Building api
Step 1/3 : FROM node:12.16.2-slim
 ---> 143b043e4cff
Step 2/3 : WORKDIR /home/node/app
 ---> Using cache
 ---> 35a4088c4a30
Step 3/3 : CMD npm start
 ---> Using cache
 ---> c7a05bde5cee

Successfully built c7a05bde5cee
Successfully tagged docker-tutorial_api:latest
WARNING: Image for service api was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating mysql-ctr ... done
Creating node-ctr  ... done
Creating php-ctr   ... done
```

Consultando os container iniciados ou parados.

```
$ docker ps -a

CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                    NAMES
029bdbf54a18        php:7.2-apache        "docker-php-entrypoi…"   23 seconds ago      Up 22 seconds       0.0.0.0:8888->80/tcp     php-ctr
970684121cd8        docker-tutorial_api   "docker-entrypoint.s…"   24 seconds ago      Up 22 seconds       0.0.0.0:9001->9001/tcp   node-ctr
58bf7ed3566f        mysql                 "docker-entrypoint.s…"   25 seconds ago      Up 23 seconds       3306/tcp, 33060/tcp      mysql-ctr
```

### 3. Testando os Containers

Abrir um **Navegador Web** (**_browser_**) e testar os links:

Link | Descrição
---|---
[localhost:9001/products](http://localhost:9001/products) | Link do Container Docker da API NodeJS
[localhost:8888](http://localhost:8888) | Link do Container Docker do PHP retornando uma página html.

## Outros Comandos do **Docker Compose** 

### . Parando Todos os Serviços

Na pasta raiz do projeto executar o comando:

```
$ docker-compose stop

Stopping php-ctr   ... done
Stopping node-ctr  ... done
Stopping mysql-ctr ... done
```

Consultando os container iniciados ou parados.

```
$ docker ps -a

CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS                        PORTS               NAMES
029bdbf54a18        php:7.2-apache        "docker-php-entrypoi…"   33 minutes ago      Exited (0) 25 minutes ago                         php-ctr
970684121cd8        docker-tutorial_api   "docker-entrypoint.s…"   33 minutes ago      Exited (137) 25 minutes ago                       node-ctr
58bf7ed3566f        mysql                 "docker-entrypoint.s…"   33 minutes ago      Exited (0) 25 minutes ago                         mysql-ctr

```

### . Reiniciando Todos os Serviços

Na pasta raiz do projeto executar o comando:

```
$ docker-compose start

Starting db  ... done
Starting api ... done
Starting web ... done
```

Consultando os container iniciados ou parados.

```
$ docker ps -a

CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                    NAMES
029bdbf54a18        php:7.2-apache        "docker-php-entrypoi…"   36 minutes ago      Up 23 seconds       0.0.0.0:8888->80/tcp     php-ctr
970684121cd8        docker-tutorial_api   "docker-entrypoint.s…"   36 minutes ago      Up 23 seconds       0.0.0.0:9001->9001/tcp   node-ctr
58bf7ed3566f        mysql                 "docker-entrypoint.s…"   36 minutes ago      Up 24 seconds       3306/tcp, 33060/tcp      mysql-ctr
```

### . Removendo Todos os Serviços

Na pasta raiz do projeto executar o comando:

```
$ docker-compose down

Stopping php-ctr   ... done
Stopping node-ctr  ... done
Stopping mysql-ctr ... done
Removing php-ctr   ... done
Removing node-ctr  ... done
Removing mysql-ctr ... done
Removing network docker-tutorial_default
```

Consultando os container iniciados ou parados.

```
$ docker ps -a

CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                    NAMES

```
