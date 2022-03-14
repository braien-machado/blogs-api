const User = require('../services/User');

module.exports = async (req, _res, next) => {
  try {
    const { displayName, email, password } = req.body;
    const { error } = User.validateUser({ displayName, email, password });

    if (!error) return next();

    error.code = 400;
    
    next(error);
  } catch (error) {
    next(error);
  }
};
