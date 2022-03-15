const express = require('express');
const userController = require('../controllers/User');

const app = express.Router();

app.get('/', userController.getAllUsers);
app.get('/:id', userController.getUserById);
app.delete('/me', userController.deleteUser);

module.exports = app;