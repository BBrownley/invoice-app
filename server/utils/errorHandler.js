const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
  console.log(err.toString());
};

module.exports = errorHandler;
