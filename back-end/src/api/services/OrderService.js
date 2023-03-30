const { Sale, User } = require('../../database/models');

class OrderService {
    constructor() {
        this.saleModel = Sale;
        this.userModel = User;
    }

    async getUserId(name) {
        const userId = await this.userModel.findOne({
            attributes: ['id'],
            where: { name }, 
        });
        return userId.id;
    }

    async createSale(body, customer) {
        const { totalPrice, deliveryAddress, deliveryNumber, sellerName } = body;
        console.log(body);
        const userId = await this.getUserId(customer.name);
        const sellerId = await this.getUserId(sellerName);
        console.log(sellerId, userId);
        const newSale = await this.saleModel.create({
            userId,
            sellerId,
            totalPrice,
            deliveryAddress,
            deliveryNumber,
            status: 'Pendente' });
            console.log('a');
        return newSale;
}
}

module.exports = OrderService;
