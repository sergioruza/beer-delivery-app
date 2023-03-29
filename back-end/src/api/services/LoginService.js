const md5 = require('md5');
const { User } = require('../../database/models');
const GenericError = require('../../errors/GenericError');
const generateToken = require('../../token/generateToken');

class LoginService {
  constructor() {
    this.model = User;
  }

  async findByEmail(email, password) {
    const passwordHash = md5(password);
    const user = await this.model.findOne({ where: { email } });
    
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
