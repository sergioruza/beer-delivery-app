const RegisterService = require('../services/RegisterService');

class RegisterController {
    constructor(req, res) {
        this.service = new RegisterService();
        this.req = req;
        this.res = res;
    }

async createUser() {
    const token = await this.service.createUser(this.req.body);
    const status = token.status ? token.status : 201;
    return this.res.status(status).json(token);
}
}

module.exports = RegisterController;
