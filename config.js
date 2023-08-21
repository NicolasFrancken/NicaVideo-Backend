const { config } = require("dotenv");
config();

module.exports = {
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  renderUrl: process.env.RENDER_URL,
  db: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
  },
};
