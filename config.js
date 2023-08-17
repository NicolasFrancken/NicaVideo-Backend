const { config } = require("dotenv");
config();

module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    postgresDatabase: process.env.DB_POSTGRESDATABASE,
  },
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  renderUrl: process.env.RENDER_URL,
};
