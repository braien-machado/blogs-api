const express = require('express');

const userController = require('./controllers/User');
const loginController = require('./controllers/Login');
const { validateUser, errorHandler } = require('./middlewares');

const app = express();
app.use(express.json());

app.post('/user', validateUser, userController.createUser);
app.post('/login', validateUser, loginController.login);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
