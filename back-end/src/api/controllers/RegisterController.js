const RegisterService = require('../services/RegisterService');

class RegisterController {
    constructor(req, res) {
        this.service = new RegisterService();
        this.req = req;
        this.res = res;
    }

async createUser() {
    const token = await this.service.createUser(this.req.body);
    return this.res.status(201).json({ token });
}
}

module.exports = RegisterController;
