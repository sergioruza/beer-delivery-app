const { Product } = require('../../database/models');

class ProductsService {
  constructor() {
    this.model = Product;
    this.sla = 'sla';
  }

  async findAllProducts() {
    const allProducts = await this.model.findAll();
    if (!allProducts) return { error: 'Products not found', errorStatus: 404 };

    return allProducts;
  }

  async findById(id) {
    const product = await this.model.findOne({ where: { id } });
    if (!product) return { error: 'Product not found', errorStatus: 404 };

    return product;
  }
}

module.exports = {
  ProductsService,
};
