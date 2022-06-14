const knex = require("knex");

module.exports = knex({
  client: "postgres",
  connection: {
    host: "localhost",
    user: "postgres_user",
    password: "postgres",
    database: "accounting",
  },
});
