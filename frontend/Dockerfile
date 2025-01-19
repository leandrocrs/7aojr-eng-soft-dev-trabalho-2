FROM pulsefit-base:latest AS build

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /home/node/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]