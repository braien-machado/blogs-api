const express = require('express');

const userController = require('./controllers/User');
const loginController = require('./controllers/Login');
const { validateUser, errorHandler } = require('./middlewares');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(express.json());

app.get('/user', validateJWT, userController.getUsers);
app.post('/user', validateUser, userController.createUser);
app.get('/user/:id', validateJWT, userController.getUser);
app.post('/login', validateUser, loginController.login);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
