const obj = (Sequelize) => [{
     id: 1,
     userId: 2,
     sallerId: 3,
     totalPrice: 10.85,
     deliveryAddress: 'Rua fulano de tal, bairro seila das quantas',
     deliveryNumber: '371',
     saleDate: Sequelize.literal('CURRENT_TIMESTAMP'),
     status: 'Pendente',
    },
    {
      id: 2,
      userId: 4,
      sallerId: 1,
      totalPrice: 52.85,
      deliveryAddress: 'Rua Seila, bairro Nao Sei',
      deliveryNumber: '8555',
      saleDate: Sequelize.literal('CURRENT_TIMESTAMP'),
      status: 'Entregue',
     }]; 

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'People', 
      obj(Sequelize),
      { timestemp: true, underscored: true },
  );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
