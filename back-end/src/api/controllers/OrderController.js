const OrderService = require('../services/OrderService');

class OrderController {
    constructor(req, res) {
        this.service = new OrderService();
        this.req = req;
        this.res = res;
    }

    async createSale() {
        const { type, message } = await this.service.createSale(this.req.body);
        if (type) return this.res.status(type).json({ message });
        return this.res.status(201).json(message);
    }
}

module.exports = OrderController;
