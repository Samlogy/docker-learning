const knex = require("knex");

module.exports = knex({
  client: "postgres",
  connection: {
    host: "localhost",
    user: "postgres_user",
    port: 5432,
    password: "postgres",
    database: "accounting",
  },
});
