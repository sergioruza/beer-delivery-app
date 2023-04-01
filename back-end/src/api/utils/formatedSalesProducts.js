const getProductDetail = require('./getProductDetails');

const formatedSalesProducts = async (sales, salesProducts, products) => {
  const newOrders = sales.map((order) => {
    const filteredSalesProducts = salesProducts.filter((s) => s.saleId === order.id);
    return {
        ...order.dataValues,
        products: getProductDetail(filteredSalesProducts, products),
        sellerName: 'Fulana Pereira',
    };
    });

   await Promise.all(newOrders);
   return newOrders;
};

module.exports = formatedSalesProducts;