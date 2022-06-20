const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient(6379, 'cache_redis');


  client.auth('password', function() {
    console.log('Redis client connected');
  });

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};
