const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());

let count = 0;
app.get("/", (req, res) => {
  count++;
  res.send(`Hello World, visited: ${count}`);
});

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));
