const UsersService = require('../services/UsersService');

class UsersControllers {
  constructor(req, res) {
    this.service = new UsersService();
    this.req = req;
    this.res = res;
  }

  async findAll() {
    const users = await this.service.findAll();
    if (users.error) {
      return this.res.status(users.status).json(users.error);
    }

    return this.res.status(201).json(users);
  }

  async deleteUser() {
    const { id } = this.req.params;
    const deleteUser = await this.service.deleteUser(+id);
    if (deleteUser.error) {
      return this.res.status(deleteUser.status).json({ error: deleteUser.error });
    }

    return this.res.status(204).send('ok');
  }
}

module.exports = UsersControllers;
