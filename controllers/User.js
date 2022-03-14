const { createUser, generateToken } = require('../services/User');

module.exports = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const createdUser = await createUser({ displayName, email, password, image });
    const token = await generateToken(createdUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};