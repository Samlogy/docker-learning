const express = require("express");
const morgan = require("morgan");

const db = require("./db");

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
  const users = await db.select().from("User");
  res.json(users);
});

app.listen(PORT, () => console.log(`Server on: ${PORT}`));
