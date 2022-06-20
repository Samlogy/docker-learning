FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

RUN npm install

COPY . .


# required for docker desktop port mapping
EXPOSE 4000

#CMD ["npm", "run", "dev"]
CMD [  "npm", "run", "dev" ]