const { Pool } = require("pg");
const { renderUrl } = require("./config");

const pool = new Pool({
  connectionString: renderUrl,
});

module.exports = pool;
