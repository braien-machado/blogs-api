const User = require('../services/User');

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const createdUser = await User.createUser({ displayName, email, password, image });
    const token = await User.generateToken(createdUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
