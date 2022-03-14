const Joi = require('joi');
const { findByEmail } = require('../services/User');

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email({ minDomainSegments: 1 }).required(),
  password: Joi.string().length(6).required(),
});

module.exports = async (req, _res, next) => {
  try {
    const { displayName, email, password } = req.body;
    const { error } = schema.validate({ displayName, email, password });

    if (!error) {
      const userAlreadyRegistered = await findByEmail(email);

      if (userAlreadyRegistered) {
        const err = { message: 'User already registered', code: 409 };

        next(err);
      }
      return next();
    }
    error.code = 400;
    
    next(error);
  } catch (error) {
    next(error);
  }
};
