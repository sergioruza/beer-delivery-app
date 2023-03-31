const { Sale, User, sequelize, SaleProduct } = require('../../database/models');
const validateSale = require('./validations/validateSale');

class OrderService {
    constructor() {
        this.saleModel = Sale;
        this.userModel = User;
        this.saleProductModel = SaleProduct;
    }

    async getUserId(name) {
        const userId = await this.userModel.findOne({
            attributes: ['id'],
            where: { name }, 
        });
        return userId.id;
    }

    async createSale(body) {
        if (validateSale(body)) return { type: 400, message: 'Bad Request' };
        const { totalPrice, deliveryAddress, deliveryNumber, sellerName, user, products } = body;
        const newSale = await sequelize.transaction(async (t) => {
            const sellerId = await this.getUserId(sellerName);
            const sale = await this.saleModel.create({ userId: user.id,
                sellerId,
                totalPrice,
                deliveryAddress,
                deliveryNumber,
                status: 'Pendente',
            }, { transaction: t });
            await this.createSaleProduct(sale.id, products, t);
            return { type: null, message: sale };
        });
        return newSale;
    }

async createSaleProduct(saleId, products, t) {
    const saleProduct = products.map((e) => (
        {
            saleId,
            productId: e.id,
            quantity: e.quantity,
        }));
        console.log(saleProduct);
        return this.saleProductModel.bulkCreate(saleProduct, { transaction: t });
}
}

module.exports = OrderService;
