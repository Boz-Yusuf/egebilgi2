const pgp = require("pg-promise")();
const keys = require("./keys");
const db = pgp({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

module.exports = db;
