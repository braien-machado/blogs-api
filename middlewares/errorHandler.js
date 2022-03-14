module.exports = (err, _req, res, _next) => {
  if (err.code) return res.status(err.code).json({ message: err.message });
  if (err.message) return res.status(500).json({ message: err.message });
  res.status(500).json({ message: 'Something went wrong' });
};