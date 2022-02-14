FROM node:16-alpine as builder

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

CMD yarn --port 3000