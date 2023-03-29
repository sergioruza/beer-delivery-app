const express = require('express');
require('express-async-errors');
const cors = require('cors');
// const ErrorHandler = require('./middlewares/errorHandler');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).json('sou lindo'));
app.use('/login', routes.loginRoute);

// app.use(ErrorHandler.handle);

module.exports = app;
