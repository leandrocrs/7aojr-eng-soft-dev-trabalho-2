FROM node:22-alpine

RUN mkdir -p /home/node/libs/auth-middleware && chown -R node:node /home/node/

WORKDIR /home/node/libs

COPY ./auth-middleware/package*.json ./auth-middleware/

USER node

RUN cd auth-middleware && npm ci

COPY --chown=node:node . .