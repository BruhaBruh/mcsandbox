FROM node:16-alpine as builder

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

CMD yarn start --port 3000