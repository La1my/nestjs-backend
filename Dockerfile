FROM node:lts-alpine3.19

WORKDIR .

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf ./src

ENV PORT 7000

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]
