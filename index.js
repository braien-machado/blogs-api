const express = require('express');

const userController = require('./controllers/User');
const middlewares = require('./middlewares');

const app = express();
app.use(express.json());

app.post('/user', middlewares.validateNewUser, userController.createUser);

app.use(middlewares.errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
