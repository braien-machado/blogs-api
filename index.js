const express = require('express');

const categoryController = require('./controllers/Category');
const userController = require('./controllers/User');
const loginController = require('./controllers/Login');
const { validateUser, errorHandler } = require('./middlewares');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(express.json());

app.post('/login', validateUser, loginController.login);

app.post('/user', validateUser, userController.createUser);
app.get('/user', validateJWT, userController.getAllUsers);
app.get('/user/:id', validateJWT, userController.getUser);

app.post('/categories', validateJWT, categoryController.createCategory);
app.get('/categories', validateJWT, categoryController.getAllCategories);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
