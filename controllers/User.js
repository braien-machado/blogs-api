const User = require('../services/User');

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const userAlreadyRegistered = await User.getUserByParam('email', email);
    
    if (userAlreadyRegistered.id) {
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

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.getUserByParam('id', id);

    if (!users.id) return res.status(404).json({ message: 'User does not exist' });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req;

    await User.deleteUser(userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteUser,
  createUser,
  getUserById,
  getAllUsers,
};
