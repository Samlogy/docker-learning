const express = require("express");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");

const PORT = process.env.PORT || 5000;
const app = express();
const prisma = new PrismaClient();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let count = 0;

app.get("/", (req, res) => {
  count++;
  res.send(`Hello World visited: ${count}`);
});

app.get("/todos", async (req, res) => {
  try {
    const users = await prisma.todo.findMany();
    return res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err,
    });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const newTodo = await prisma.todo.create({
      data: req.body,
    });
    return res.json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

const startServer = () => {
  app.listen(PORT, async () => {
    console.log(`Server on: ${PORT}`);
  });
};

startServer();
