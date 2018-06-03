FROM node:8.5.0-alpine

COPY package.json /tmp/package.json

RUN  cd /tmp && npm install

RUN mkdir -p /home/code && cp -a /tmp/node_modules /home/code

WORKDIR /home/code

ADD src /home/code/src

COPY package.json /home/code/package.json

RUN mkdir -p /home/code/config

COPY config/webpack.config.js /home/code/config

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]