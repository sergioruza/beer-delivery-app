const LoginService = require('../services/LoginService');

class LoginController {
  constructor(req, res) {
    this.service = new LoginService();
    this.req = req;
    this.res = res;
  }

  async findByEmail() {
    const { email, password } = this.req.body;
    const user = await this.service.findByEmail(email, password);
    const status = user.status ? user.status : 200;
    return this.res.status(status).json(user);
  }
}

module.exports = LoginController;
