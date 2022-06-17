const express = require("express");
const morgan = require("morgan");

const { PrismaClient } = require("@prisma/client");
const dbPrisma = require("./db");

const { user } = new PrismaClient();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let count = 0;
app.get("/", (req, res) => {
  count++;
  res.send(`Hello World visited: ${count}`);
});

app.get("/users", async (req, res) => {
  const users = await user.findMany();
  res.json(users);
});

const startServer = () => {
  app.listen(PORT, () => {
    dbPrisma;
    console.log(`Server on: ${PORT}`);
  });
};

startServer();
