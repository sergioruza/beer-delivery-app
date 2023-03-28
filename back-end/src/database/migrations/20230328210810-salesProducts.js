const saleProduct = (Sequelize) => ({
  saleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'sales', key: 'id' },
    primaryKey: true,
    field: 'sale_id',
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'products', key: 'id' },
    primaryKey: true,
    field: 'product_id',
  },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', saleProduct(Sequelize));
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  },
};
