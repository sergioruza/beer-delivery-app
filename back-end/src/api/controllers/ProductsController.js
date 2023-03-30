const { ProductsService } = require('../services/ProductsService');

class ProductsController {
  constructor(req, res) {
    this.service = new ProductsService();
    this.req = req;
    this.res = res;
  }

  async findAllProducts() {
    const allProducts = await this.service.findAllProducts();
    const status = allProducts.errorStatus ? allProducts.errorStatus : 200;
    return this.res.status(status).json(allProducts);
  }

  async findById() {
    const { id } = this.req.params;
    const oneProduct = await this.service.findById(id);
    const status = oneProduct.errorStatus ? oneProduct.errorStatus : 200;
    return this.res.status(status).json(oneProduct);
  }
}

module.exports = {
  ProductsController,
};
