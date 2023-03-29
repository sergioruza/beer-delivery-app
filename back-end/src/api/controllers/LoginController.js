const { LoginService } = require('../services/LoginController');

class LoginController {
  constructor(req, res) {
    this.service = new LoginService();
    this.req = req;
    this.res = res;
  }

  async findByEmail() {
    const { email } = this.req.body;
    const user = this.service.findByEmail(email);
    return this.res.status(200).json(user);
  }
}

module.exports = {
  LoginController,
};
