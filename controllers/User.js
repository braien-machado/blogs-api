const User = require('../services/User');

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const userAlreadyRegistered = await User.getUserByParam('email', email);
    
    if (Object.keys(userAlreadyRegistered).length) {
      const err = { message: 'User already registered', code: 409 };

      return next(err);
    }

    const createdUser = await User.createUser({ displayName, email, password, image });
    const token = User.generateToken(createdUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
