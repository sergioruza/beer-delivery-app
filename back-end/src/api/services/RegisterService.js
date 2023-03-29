const md5 = require('md5');
// const LoginService = require('./LoginService');
const generateToken = require('../token/generateToken');
const GenericError = require('../../errors/GenericError');
const { User } = require('../../database/models');
const validateRegister = require('./validations/validateRegister');

class RegisterService {
    constructor() {
        this.model = User;
    }

   async createUser({ name, email, password }) {
    validateRegister({ name, email, password });
       const users = await this.model.findAll();
       const repetedUsers = users.filter((e) => e.email === email || e.name === name);
    
       if (repetedUsers.length > 0) throw new GenericError('username or email already exists', 409);
       const newUser = await this.model.create(
        { name, email, password: md5(password), role: 'customer' },
        );

        const token = generateToken(
            { name: newUser.name, email: newUser.email, role: newUser.role },
            );

        return token; 
   }
}

module.exports = RegisterService;
