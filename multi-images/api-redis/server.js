const express = require("express");
const morgan = require("morgan");
const { PrismaClient, Prisma } = require("@prisma/client");

const dbPrisma = require("./utils/db");
const redisClient = require('./utils/redis-client');

const app = express();
const client = new PrismaClient();

const PORT = process.env.PORT || 5001;

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    let prevCount = await redisClient.getAsync('greeting')
    if (prevCount === null) prevCount = 0
    const newCount = parseInt(prevCount) + 1
    const setted = await redisClient.setAsync('greeting', newCount);

    res.send(`Hello, visited: ${newCount}`)
  } catch(err) {
    res.send(`err: ${err}`)
  }
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
      data: { ...req.body },
    });
    return res.json({
      success: true,
      data: newTodo,
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


app.listen(PORT, () => {
  dbPrisma;
  console.log(`listening on: ${PORT}`);
});

