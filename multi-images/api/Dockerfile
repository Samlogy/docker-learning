FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/

COPY .env ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [  "npm", "run", "dev:deploy" ]