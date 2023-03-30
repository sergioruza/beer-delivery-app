const express = require('express');
const { ProductsController } = require('../controllers/ProductsController');

const productsRoute = express.Router();

productsRoute.get('/', (req, res) => new ProductsController(req, res).findAllProducts());
productsRoute.get('/:id', (req, res) => new ProductsController(req, res).findById());

module.exports = productsRoute;
