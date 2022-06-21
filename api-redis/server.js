const express = require('express');
const morgan = require('morgan')
const redisClient = require('./redis-client');

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  return res.send('Hello world');
});

app.get("/cache", async (req, res) => {
  let prevCount = await redisClient.getAsync('greeting')
  if (prevCount === null) prevCount = 0
  const newCount = parseInt(prevCount) + 1
  const setted = await redisClient.setAsync('greeting', newCount);

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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});