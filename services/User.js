const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getUserByParam = async (column, value, array) => {
  const user = await User.findOne({
    where: { [column]: value },
    attributes: { exclude: array } });
  
  if (user) return user.dataValues;
  return {};
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

const validateUser = (object) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8),
    email: Joi.string().email({ minDomainSegments: 1 }).required(),
    password: Joi.string().length(6).required(),
  });

  return schema.validate(object);
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  deleteUser,
  validateUser,
  getUserByParam,
  createUser,
  generateToken,
  getAllUsers,
};
