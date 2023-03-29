const express = require('express');
const RegisterController = require('../controllers/RegisterController');

const registerRouter = express.Router();

registerRouter.post('/', (req, res) => new RegisterController(req, res).createUser());

module.exports = registerRouter;