module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: 2.20,
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: 7.50,
        urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      },
    ], { underscored: true, timestamp: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
