const md5 = require('md5');
const LoginService = require('./LoginService');
const GenericError = require('../../errors/GenericError');
const { User } = require('../../database/models');

class RegisterService {
    constructor() {
        this.model = User;
        this.login = new LoginService();
    }

   async createUser(username, email, password) {
       const user = await this.model.findAll();
       const repetedUsers = user.filter((e) => e.email === email || e.username === username);
       if (repetedUsers.length > 0) throw new GenericError('username or email already exists', 409);
       const newUser = await this.model.create(
        { username, email, password: md5(password), role: 'customer' },
        );
return newUser;
   }
}

module.exports = RegisterService;
