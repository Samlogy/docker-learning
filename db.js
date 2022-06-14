const knex = require("knex");

module.exports = knex({
  client: "postgres",
  connection: {
    host: "localhost",
    //port: 5432,
    user: "postgres_user",
    password: "postgres",
    database: "accounting",
  },
});
