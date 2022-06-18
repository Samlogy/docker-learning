const express = require("express");
const morgan = require("morgan");
const { PrismaClient, Prisma } = require("@prisma/client");
const dbPrisma = require("./db");

const PORT = process.env.PORT || 5000;
const app = express();
const client = new PrismaClient();

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
    const users = await client.todo.findMany();
    return res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (err.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
        return res.status(500).json({
          success: false,
          message:
            "There is a unique constraint violation, a new user cannot be created with this email",
        });
      }
    }
    throw err;
  }
});

app.post("/todos", async (req, res) => {
  try {
    const newTodo = await client.todo.create({
      data: req.body,
    });
    return res.json({
      success: true,
      data: newTodo,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err,
    });
  }
});

const startServer = () => {
  app.listen(PORT, async () => {
    dbPrisma;
    console.log(`Server on: ${PORT}`);
  });
};

startServer();
