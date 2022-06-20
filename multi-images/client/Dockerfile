FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY . .

EXPOSE 3000
# required for docker desktop port mapping

CMD ["npm", "start"]