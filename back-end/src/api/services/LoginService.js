const md5 = require('md5');
const { User } = require('../../database/models');
const { default: GenericError } = require('../../errors/GenericError');
const generateToken = require('../../token/generateToken');
const { GenericMethods } = require('../utils/GenericMethods');

class LoginService extends GenericMethods {
  constructor() {
    super(User);
    this.model = User;
  }

  async findByEmail(email, password) {
    const passwordHash = md5(password);
    const user = this.model.findOne({ where: { email } });
    
    if (!user || passwordHash !== user.password) throw new GenericError('User not found', 404);
    const payload = {
      email: user.email,
      role: user.role,
      username: user.username,
    };
    const token = await generateToken(payload);
    return { token, role: user.role };
  }
}

module.exports = {
  LoginService,
};
