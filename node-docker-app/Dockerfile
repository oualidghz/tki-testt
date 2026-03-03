ARG NODE_VERSION=18

FROM node:${NODE_VERSION}

WORKDIR /app

COPY . .

RUN npm install express jsonwebtoken

EXPOSE 5007


CMD ["node", "server.js"]