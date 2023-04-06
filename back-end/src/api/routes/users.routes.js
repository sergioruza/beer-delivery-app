const express = require('express');
const UsersController = require('../controllers/UsersController');

const registerRouter = express.Router();

registerRouter.get('/', (req, res) => new UsersController(req, res).findAll());
registerRouter.delete('/:id', (req, res) => new UsersController(req, res).deleteUser());

module.exports = registerRouter;
