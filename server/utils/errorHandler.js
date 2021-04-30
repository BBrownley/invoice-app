const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
  console.log(err);
};

module.exports = errorHandler;
