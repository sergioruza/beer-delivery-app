const GenericError = require('../../../errors/GenericError');
const registerSchema = require('./registerSchema');

const validateRegister = (body) => {
    const { error } = registerSchema.validate(body);
    if (error) throw new GenericError(error.message, 400);
};

module.exports = validateRegister;
