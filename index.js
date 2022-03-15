const express = require('express');

const userRouter = require('./routes/User');
const postRouter = require('./routes/Post');
const categoriesRouter = require('./routes/Categories');
const { login } = require('./controllers/Login');
const { createUser } = require('./controllers/User');
const { validateUser, errorHandler } = require('./middlewares');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(express.json());

app.post('/user', validateUser, createUser);
app.post('/login', validateUser, login);

app.use(validateJWT);

app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
