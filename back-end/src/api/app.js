const express = require('express');
require('express-async-errors');
const cors = require('cors');
// const ErrorHandler = require('./middlewares/errorHandler');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).json('teste'));
app.use('/login', routes.loginRoute);
app.use('/register', routes.registerRoute);
app.use('/products', routes.productsRoute);
app.use('/orders', routes.ordersRoute);

// app.use(ErrorHandler.handle);

module.exports = app;
