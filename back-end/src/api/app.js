const express = require('express');
require('express-async-errors');
const ErrorHandler = require('./middlewares/errorHandler');

const routes = require('./routes');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', routes.loginRoute);
app.use(ErrorHandler.handle);


module.exports = app;
