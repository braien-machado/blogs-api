const Joi = require('joi');
const User = require('../services/User');

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email({ minDomainSegments: 1 }).required(),
  password: Joi.string().min(6).required(),
});

module.exports = async (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = schema.validate({ displayName, email, password });

  if (!error) {
    const userAlreadyRegistered = await User.findByEmail(email);

    if (userAlreadyRegistered) {
      error.message = 'User already registered';
      error.code = 400;

      next(error);
    }
    return next();
  }

  error.code = 400;
  next(error);
};
