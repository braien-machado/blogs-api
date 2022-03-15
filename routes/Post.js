const express = require('express');

const postController = require('../controllers/Post');
const { validatePost, validateAuthorizedUser, validatePostUpdate } = require('../middlewares');

const app = express.Router();

app.get('/', postController.getAllPosts);
app.get('/search', postController.getPostBySearchTerm);
app.get('/:id', postController.getPostById);
app.post('/', validatePost, postController.createPost);

app.use('/:id', validateAuthorizedUser);
app.put('/:id', validatePostUpdate, postController.updatePost);
app.delete('/:id', postController.deletePost);

module.exports = app;