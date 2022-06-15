const express = require("express");
const morgan = require("morgan");

const db = require("./db");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json([
    {
      name: "Timothé Luwawu-Cabarrot",
      url: "https://usports.org/wp-content/uploads/Timothe.jpg",
    },
    {
      name: "Austin Rivers",
      url: "https://balldurham.com/wp-content/uploads/getty-images/2017/07/1185724785.jpeg",
    },
    {
      name: "Dillon Brooks",
      url: "https://media.gettyimages.com/photos/dillon-brooks-of-the-memphis-grizzlies-in-action-against-the-brooklyn-picture-id1293805505",
    },
  ]);
});

app.get("/users", async (req, res) => {
  const users = await db.select().from("User");
  res.json(users);
});

app.listen(PORT, () => console.log(`Server on: ${PORT}`));
