const { User } = require('../../database/models');

class UsersService {
  constructor() {
    this.model = User;
  }

  async findAll() {
    const users = await this.model.findAll();
    if (!users) return { error: 'Não foram encontrados usuários cadastrados', status: 404 };
    return users;
  }
}

module.exports = UsersService;
