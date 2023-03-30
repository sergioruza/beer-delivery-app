const express = require('express');
const OrderController = require('../controllers/OrderController');
const authenticateToken = require('../token/authenticateToken');

const orderRouter = express.Router();

orderRouter.post('/', authenticateToken, (req, res) => new OrderController(req, res).createSale());

module.exports = orderRouter;
