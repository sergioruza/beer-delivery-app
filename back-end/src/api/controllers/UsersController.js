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
}

module.exports = UsersControllers;
