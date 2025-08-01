function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error occurred', error: err.message });
}

module.exports = errorHandler;
