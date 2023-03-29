const express = require('express');
const { fieldsValidate } = require('../middlewares/loginFields');

const router = express.Router();

router.post('/', fieldsValidate);

module.exports = router;
