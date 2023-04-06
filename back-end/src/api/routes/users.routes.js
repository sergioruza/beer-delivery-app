const express = require('express');
const UsersController = require('../controllers/UsersController');

const registerRouter = express.Router();

registerRouter.get('/', (req, res) => new UsersController(req, res).findAll());

module.exports = registerRouter;
