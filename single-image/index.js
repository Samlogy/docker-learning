const express = require("express");
const morgan = require("morgan");

const { PrismaClient } = require("@prisma/client");
const dbPrisma = require("./db");

const prisma = new PrismaClient();

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
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const users = await prisma.user.create({
    data: req.body,
  });
  res.json(users);
});

const startServer = () => {
  app.listen(PORT, async () => {
    let retries = 5;
    while (retries) {
      try {
        dbPrisma;
        break;
      } catch (err) {
        retries--;
        console.log(`retries left: ${retries}`);
        console.log("err: ", err);
        await new Promise((res) => setTimeout(res, 5000));
      }
    }

    console.log(`Server on: ${PORT}`);
  });
};

startServer();
