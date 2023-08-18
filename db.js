const { Pool } = require("pg");
const { renderUrl } = require("./config");

const pool = new Pool({
  // user: db.user,
  // password: db.password,
  // host: db.host,
  // port: db.port,
  // database: db.database,

  connectionString: renderUrl,
});

module.exports = pool;
