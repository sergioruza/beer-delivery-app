module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales_products', [
      {
        saleId: 1,
        productId: 2,
        quantity: 5,
      },
      {
        saleId: 2,
        productId: 1,
        quantity: 6,
      },
    ], { underscored: true, timestamp: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
};
