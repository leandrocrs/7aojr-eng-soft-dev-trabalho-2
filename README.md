# 7aojr-eng-soft-dev-trabalho-2

Trabalho 2 de Engineering Software Development do curso MBA 7AOJR da Fiap

## Arquitetura geral
![Arquitetura geral](./docs/esquema%20geral%20do%20trabalho%202%20de%20engineering%20software.png)

## Requisitos

- [Docker Compose](https://docs.docker.com/compose/install/)
- Shell [POSIX](https://pt.wikipedia.org/wiki/POSIX). Ex: (sh, bash, zsh)

## Rodando o projeto

### 1. Construir a imagem base

Necessário primeiro buildar a imagem docker base:

```sh
# dar permissão. necessário executar só uma vez
chmod u+x ./build-base-image.sh
# constrói a imagem base
./build-base-image.sh
```
Esse comando deve ser executado novamente sempre que houver alterações dentro de `./libs`.

### 2. Levantar a infra

```sh
docker compose up
```

Opcionalmente, caso queira rodar somente algum serviço específico, basta utilizar o `docker compose up <serviço>`.

Exemplo:
```sh
docker compose up user-management-service
```

Se tiver enfrentando erros, tentar reconstruir a infra com o comando:

```sh
docker compose up --build
```

## Frontend
- [frontend](http://localhost/)

## APIs

- [/users/](http://localhost/api/users/docs)
- [/playlists-catalog/](http://localhost/api/playlists-catalog/docs)
- [/training/](http://localhost/api/training/docs)
- [/reports-and-progress/](http://localhost/api/reports-and-progress/docs)
- [/notifications/](http://localhost/api/notifications/docs)
- [/gamefication/](http://localhost/api/gamefication/docs)

## Requisitos do trabalho

- [ ] UM MICROSERVIÇO COM AÇÕES CRUD			2 PONTOS (+ 1 PONTO / MICROSERVIÇO) .
- [ ] TESTES (UNITÁRIOS + INTEGRAÇÃO + UI)	    	+ 1  OU + 2 OU + 3 PONTOS
- [ ] USO DE BANCO DE DADOS 					+ 2 PONTOS
- [ ] DEPLOY VIA DOCKER							+ 1 PONTO
- [ ] COMUNICAÇÃO SINCRONA API	COM SWAGGER	+ 1 PONTOS
- [ ] COMUNICAÇÃO ASSINCRONA EVENTOS			+ 2 PONTOS
- [ ] FRONT END 									+ 2 PONTOS
- [ ] INTEGRAÇÃO TEAMS							+ 1 PONTO
- [ ] PIPELINE CI/CD					+ 1 PONTO
