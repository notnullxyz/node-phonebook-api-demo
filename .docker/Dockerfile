FROM node:8.9.1-alpine

RUN mkdir -p /var/log/applications/project4alpha

ENV NODE_PATH=.

WORKDIR /src
COPY . /src

EXPOSE  8080

CMD ["node", "/src/server.js"]
