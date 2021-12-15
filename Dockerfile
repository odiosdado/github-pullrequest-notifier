FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
COPY  ./src /usr/src/app

RUN apk add --no-cache git &&\
    npm install &&\
    npm prune --production

FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/ /usr/src/app/

USER node

CMD ["node","index.js"]