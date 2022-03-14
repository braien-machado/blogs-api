const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const findByEmail = async (email) => {
  const user = await User.findAll({ where: { email } });

  if (user.length > 0) return true;
  return false;
};

const createUser = async (newUserInfo) => {
  const newUser = await User.create(newUserInfo);

  return newUser;
};

const generateToken = (data) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign({ data }, secret, jwtConfig);
  
  return token;
};

module.exports = {
  findByEmail,
  createUser,
  generateToken,
};
