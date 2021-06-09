const tokenExtractor = require("express").Router();
const jwt = require("jsonwebtoken");

tokenExtractor.use((req, res, next) => {
  if (req.headers.authorization && req.originalUrl !== "/users/login") {
    req.token = req.headers.authorization.split(" ")[1];
    req.decodedToken = jwt.verify(req.token, process.env.SECRET);
  } else {
    req.isGuest = true;
  }
  next();
});

module.exports = tokenExtractor;
