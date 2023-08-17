const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");
const { renderUrl } = require("./config");

async function createDatabase() {
  try {
    const newPool = new Pool({
      connectionString: renderUrl,
    });

    const result = await newPool.query(`
    SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'creators'
    );
  `);

    if (result.rows.length === 0) {
      newPool.end();
      return;
    } else {
      const sqlScriptPath = path.join(__dirname, "./database/db.sql");
      const sqlScript = fs.readFileSync(sqlScriptPath, "utf8");
      await newPool.query(sqlScript);
      newPool.end();
    }
  } catch (e) {
    console.log("There was an error", e);
  }
}

module.exports = { createDatabase };
