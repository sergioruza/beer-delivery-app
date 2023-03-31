// const GenericError = require('../../../errors/GenericError');
const registerSchema = require('./registerSchema');

const validateRegister = (body) => {
    const { error } = registerSchema.validate(body);
    if (error) return { error: 'Campos invalidos', status: 400 };
};

module.exports = validateRegister;
