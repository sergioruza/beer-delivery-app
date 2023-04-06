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

  async deleteUser(id) {
    const user = await this.model.findOne({ where: { id } });
    if (!user) return { error: 'Usuário não encontrado', status: 404 };

    const deleteUser = await this.model.destroy({ where: { id } });
    console.log(deleteUser);
    return deleteUser;
  }
}

module.exports = UsersService;
