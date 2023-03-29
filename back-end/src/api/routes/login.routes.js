const express = require('express');
const { fieldsValidate } = require('../middlewares/loginFields');
const { LoginController } = require('../controllers/LoginController');

const router = express.Router();

router.post('/', fieldsValidate, (req, res) => new LoginController(req, res).findByEmail());

module.exports = router;
