const tokenExtractor = require("express").Router();

tokenExtractor.use((req, res, next) => {
  if (req.headers.authorization) {
    req.token = req.headers.authorization.split(" ")[1];
  } else {
    req.isGuest = true;
  }
  next();
});

module.exports = tokenExtractor;
