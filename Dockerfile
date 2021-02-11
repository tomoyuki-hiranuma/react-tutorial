FROM node:12.20.1-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN apk update && \
    npm install

EXPOSE 8080

CMD ["/bin/sh"]