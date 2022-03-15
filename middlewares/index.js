const validateUser = require('./validateUser');
const errorHandler = require('./errorHandler');
const validatePost = require('./validatePost');
const validatePostUpdate = require('./validatePostUpdate');

module.exports = {
  validatePostUpdate,
  validateUser,
  validatePost,
  errorHandler,
};