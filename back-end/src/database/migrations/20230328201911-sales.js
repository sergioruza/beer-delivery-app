const dataUser = {
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  references: { model: 'users', key: 'id' },
  field: 'user_id',
};
const dataSeller = {
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  references: { model: 'users', key: 'id' },
  field: 'seller_id',
};

const sale = (Sequelize) => ({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: { type: Sequelize.INTEGER, ...dataUser, field: 'user_id' },
  sellerId: { type: Sequelize.INTEGER, ...dataSeller, field: 'seller_id' },
  totalPrice: { type: Sequelize.FLOAT, allowNull: false, field: 'total_price' },
  deliveryAddress: { type: Sequelize.STRING, allowNull: false, field: 'delivery_address' },
  deliveryNumber: { type: Sequelize.STRING, allowNull: false, field: 'delivery_number' },
  saleDate: { type: Sequelize.DATE, allowNull: false, field: 'sale_date' },
  status: { type: Sequelize.STRING, allowNull: false },
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', sale(Sequelize));
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  },
};
