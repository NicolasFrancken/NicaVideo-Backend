const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { port } = require("./config");
const HttpError = require("./models/http-error");
const videosRoutes = require("./routes/videos-routes");
const creatorsRoutes = require("./routes/creators-routes");
const { verifyToken } = require("./middlewares/auth");
const { createDatabase } = require("./createDatabase");

const app = express();

app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/creators", creatorsRoutes);
app.use("/api/videos", videosRoutes);

app.use((req, res, next) => {
  next(new HttpError("Could not find this route", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error ocurred!" });
});

createDatabase()
  .then(() => {
    app.listen(port || 5000, () => {
      console.log("listening");
    });
  })
  .catch((error) => {
    console.error("There was an error", error);
  });
