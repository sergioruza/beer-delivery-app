const express = require('express');
const ErrorHandler = require('./middlewares/errorHandler');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', routes.loginRoute);

app.use(ErrorHandler.handle);

module.exports = app;
