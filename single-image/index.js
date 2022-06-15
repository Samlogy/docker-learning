const express = require("express");
const morgan = require("morgan");

const db = require("./db");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", async (req, res) => {
  const users = await db.select().from("User");
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = {
    email: "docker@gmail.com",
    businessName: "docker solutions",
    logo: "az",
    signature: "az",
    phone: "213 540498180",
    website: "docker-solutions.com",
    address: "algeria, tizi-ouzou",
    fullName: "docker sam",
    bankAccount: "465465456",
    noteClient: "take of u dude",
    payments: "paysera",
  };
  const data = await db("User").insert(user);
  res.json(data);
});

app.listen(PORT, () => console.log(`Server on: ${PORT}`));
