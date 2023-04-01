const { Sale, User, sequelize, SalesProduct, Product } = require('../../database/models');
const formatedSalesProducts = require('../utils/formatedSalesProducts');
const validateSale = require('./validations/validateSale');

class OrderService {
    constructor() {
        this.saleModel = Sale;
        this.userModel = User;
        this.productModel = Product;
        this.saleProductModel = SalesProduct;
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
            const sale = await this.saleModel.create({
                userId: user.id,
                sellerId,
                totalPrice,
                deliveryAddress,
                deliveryNumber,
                status: 'Pendente',
            }, { transaction: t });

            const sl = products.map((e) => ({ 
                saleId: sale.id, productId: e.id, quantity: e.quantity }));
            
            await this.saleProductModel.bulkCreate(sl, { transaction: t });

            return { type: null, message: sale };
        });
        return newSale;
    }

    async findOrdersByUserId(id) {
        const allOrders = await this.saleModel.findAll({ where: { userId: Number(id) } });
        const salesProducts = await this.saleProductModel.findAll();
        const products = await this.productModel.findAll();
        const newOrders = await formatedSalesProducts(allOrders, salesProducts, products);

        if (!newOrders) return { error: 'Products not found', errorStatus: 404 };
        return newOrders;
    }
}

module.exports = OrderService;
