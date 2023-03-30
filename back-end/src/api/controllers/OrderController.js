const OrderService = require('../services/OrderService');

class OrderController {
    constructor(req, res) {
        this.service = new OrderService();
        this.req = req;
        this.res = res;
    }

    async createSale() {
        const newUser = await this.service.createSale(this.req.body, this.req.user);
        return this.res.status(201).json(newUser);
    }
}

module.exports = OrderController;
