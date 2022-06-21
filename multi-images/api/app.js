const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PrismaClient, Prisma } = require("@prisma/client");

const dbPrisma = require("./db");
const redisClient = require('./cache');

const app = express();
const client = new PrismaClient();

const PORT = 5000

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  return res.send(`Hello, visited`)
});

app.get("/cache", async (req, res) => {
  const prevCount = await redisClient.getAsync('greeting')
  console.log(prevCount)
  if (isNaN(prevCount)) prevCount = 0
  const newCount = await redisClient.setAsync('greeting', prevCount + 1);
  console.log(newCount)

  return res.send(`Hello, visited: ${newCount}`)
});

/* {key: '', value: ""} */
app.post('/store', async (req, res) => {
  const {key, value} = req.body

  await redisClient.setAsync(key, JSON.stringify(value));
  return res.send({
    success: true,
    data: {
      key, value
    }
  });
});

/* /load/key_name */
app.get('/load/:key', async (req, res) => {
  const { key } = req.params;
  console.log(key)
  const rawData = await redisClient.getAsync(key);
  console.log(rawData)

  return res.send({
    success: true,
    data: JSON.parse(rawData)
  });
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
  console.log(req.body);
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
