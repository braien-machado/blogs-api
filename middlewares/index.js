const validateUser = require('./validateUser');
const errorHandler = require('./errorHandler');
const validatePost = require('./validatePost');
const validatePostUpdate = require('./validatePostUpdate');
const validateAuthorizedUser = require('./validateAuthorizedUser');

module.exports = {
  validateAuthorizedUser,
  validatePostUpdate,
  validateUser,
  validatePost,
  errorHandler,
};