const express = require('express');
const categoryController = require('../controllers/Category');

const app = express.Router();

app.post('/', categoryController.createCategory);
app.get('/', categoryController.getAllCategories);

module.exports = app;