const md5 = require('md5');
const { User } = require('../../database/models');
// const GenericError = require('../../errors/GenericError');
const { generateToken } = require('../token/generateToken');

class LoginService {
  constructor() {
    this.model = User;
  }

  async findByEmail(email, password) {
    const passwordHash = md5(password);
    const user = await this.model.findOne({ where: { email } });
    
    if (!user || passwordHash !== user.password) return { error: 'User not found', status: 404 };
    const payload = {
      email: user.email,
      role: user.role,
      name: user.name,
    };
    const token = await generateToken(payload);
    return { token, role: user.role, name: user.name, id: user.id };
  }
}

module.exports = {
  LoginService,
};
