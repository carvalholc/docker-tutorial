# Docker Tutorial

Neste tutorial de exemplo, criaremos 3 conteiners **docker**.

1. [Container Docker com Banco de Dados MySQL](dockerMysql.md)
1. [Container Docker com API NodeJS (que consulta o banco MySQL)](dockerNodejs.md)
1. [Container Docker com Página PHP (que consome da API NodeJS e joga para uma página HTML)](dockerPhp.md)

## Pré-Requisito

1. Instalação do Docker
2. Instalação do Docker Compose

### 1. Instalação do Docker

* Instalação via Site Oficial ( https://docs.docker.com/get-docker/ )
* Instalação via Snap

### 2. Instalação do Docker Compose


#### Instlação do Docker ( via Snap )

```
# Necessário ter instalado o pacote 'Snap'

$ sudo snap install docker
```

> Para utilizar o docker sem 'sudo', é necessário atribuir o usuário padrão ao grupo 'docker'.

```
# Verificar usuário padrão

$ echo $USER

# Verificar os grupos do usuário padrão

$ groups $USER

# Verificar se existe o grupo 'docker'

$ cat /etc/group | grep docker

# Se retornar vazio, o grupo 'docker' não existe. Vamos cria-lo.

$ sudo groupadd docker
$ cat /etc/group | grep docker

# Atribuir o usuário padrão ao grupo 'docker'

$ sudo usermod -aG docker $USER
$ groups $USER
```

> Pode ser necessário efetuar o 'reboot' da máquina.

### Fim
