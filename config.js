const { config } = require("dotenv");
config();

module.exports = {
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  renderUrl: process.env.RENDER_URL,
};
