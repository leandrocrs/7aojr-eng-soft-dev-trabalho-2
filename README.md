# 7aojr-eng-soft-dev-trabalho-2

Trabalho 2 de Engineering Software Development do curso MBA 7AOJR da Fiap

## Arquitetura geral
![Arquitetura geral](./docs/esquema%20geral%20do%20trabalho%202%20de%20engineering%20software.png)

## Requisitos

Ter o [Docker Compose](https://docs.docker.com/compose/install/) instalado.

## Rodando o projeto

Necessário primeiro buildar a imagem docker base:

```sh
chmod u+x ./build-base-image.sh
./build-base-image.sh
```
Esse comando deve ser executado novamente sempre que houver alterações dentro de `./libs`.

Basta utilizar o `docker compose up <serviço>`. Exemplo:

```sh
docker compose up user-management-service
```

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
