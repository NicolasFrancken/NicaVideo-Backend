const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const { secretKey } = require("../config");

const generateToken = () => {
  try {
    const token = jwt.sign({}, secretKey);
    return token;
  } catch (e) {
    return next(new HttpError("Something went wrong", 401));
  }
};

const verifyToken = async (req, res, next) => {
  const token = await req.cookies._auth;

  if (!token) {
    return next(new HttpError("Access denied", 401));
  }

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (e) {
    return next(new HttpError("Invalid Token", 401));
  }
};

exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
