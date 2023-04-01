const getProductDetail = (sales, products) => { 
  const newProducts = sales.map((s) => {
    const newProduct = {
      ...products.find((p) => p.id === s.productId).dataValues,
      quantity: s.quantity,
    };
    return newProduct;
  });
  return newProducts;
};

module.exports = getProductDetail;
