const express = require('express');

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const app = express();
app.use(express.json());

app.post('/user', middlewares.validateNewUser, controllers.User);

app.use(middlewares.errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
