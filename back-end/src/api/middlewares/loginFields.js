const GenericError = require('../../errors/GenericError');

const fieldsValidate = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new GenericError('Some required fields are missing', 400);
  next();
};

module.exports = {
  fieldsValidate,
};
