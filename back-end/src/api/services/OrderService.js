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

    async createSale(body) {
        const { totalPrice, deliveryAddress, deliveryNumber, sellerName, user } = body;
        const sellerId = await this.getUserId(sellerName);
        try {
            const newSale = await this.saleModel.create({
                userId: user.id,
                sellerId,
                totalPrice,
                deliveryAddress,
                deliveryNumber,
                status: 'pendente' });
            return newSale;
        } catch (err) {
            console.log(err);
            return err; 
        }
}
}

module.exports = OrderService;
