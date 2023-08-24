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
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);

  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1]; // Extraer el token después de 'Bearer'
  }

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
