const express = require('express');

const categoryController = require('./controllers/Category');
const userController = require('./controllers/User');
const loginController = require('./controllers/Login');
const postController = require('./controllers/Post');
const middlewares = require('./middlewares');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(express.json());

app.post('/login', middlewares.validateUser, loginController.login);

app.post('/user', middlewares.validateUser, userController.createUser);
app.get('/user', validateJWT, userController.getAllUsers);
app.get('/user/:id', validateJWT, userController.getUserById);

app.post('/categories', validateJWT, categoryController.createCategory);
app.get('/categories', validateJWT, categoryController.getAllCategories);

app.get('/post', validateJWT, postController.getAllPosts);
app.get('/post/search', validateJWT, postController.getPostBySearchTerm);
app.get('/post/:id', validateJWT, postController.getPostById);
app.post('/post', validateJWT, middlewares.validatePost, postController.createPost);

app.use(middlewares.errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
