const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");
const { renderUrl } = require("./config");

async function createDatabase() {
  // const pool = new Pool({
  //   user: db.user,
  //   password: db.password,
  //   host: db.host,
  //   port: db.port,
  //   database: db.postgresDatabase,
  // });

  try {
    // const result = await pool.query(
    //   "SELECT datname FROM pg_database WHERE datname = $1",
    //   ["nicasourcedb"]
    // );

    // if (result.rows.length === 0) {
    //   await pool.query(`CREATE DATABASE nicasourcedb`);
    // } else {
    //   return;
    // }

    const newPool = new Pool({
      // user: db.user,
      // password: db.password,
      // host: db.host,
      // port: db.port,
      // database: db.database,

      connectionString: renderUrl,
    });

    const sqlScriptPath = path.join(__dirname, "./database/db.sql");
    const sqlScript = fs.readFileSync(sqlScriptPath, "utf8");
    await newPool.query(sqlScript);
    newPool.end();
  } catch (e) {
    console.log("There was an error", e);
  } finally {
    newPool.end();
  }
}

module.exports = { createDatabase };
