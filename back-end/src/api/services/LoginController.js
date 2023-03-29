const { User } = require('../../database/models');
const { default: GenericError } = require('../../errors/GenericError');
const { GenericMethods } = require('../utils/GenericMethods');

class LoginService extends GenericMethods {
  constructor() {
    super(User);
    this.model = User;
  }

  async findByEmail(email) {
    const user = this.model.findOne({ where: { email } });
    if (!user) throw new GenericError('User not found', 404);
    return user;
  }
}

module.exports = {
  LoginService,
};
