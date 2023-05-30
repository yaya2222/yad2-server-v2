const errorHandler = (err, req, res, next) => {
  console.log(err.message ?? err);
  res.status(400).send({ error:  err.message ?? err});
};

module.exports = { errorHandler };
