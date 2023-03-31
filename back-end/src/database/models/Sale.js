const sale = (DataTypes) => ({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  sellerId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  totalPrice: { type: DataTypes.DECIMAL, allowNull: false },
  deliveryAddress: { type: DataTypes.STRING, allowNull: false },
  deliveryNumber: { type: DataTypes.STRING, allowNull: false },
  saleDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.STRING, allowNull: false },
});

module.exports = (sequelize, DataTypes) => {  
  const Sale = sequelize.define(
    'Sale',
    sale(DataTypes),
    { underscored: true, timestamps: false, tableName: 'sales', dialectOptions: { decimalNumbers: true } },
  );
  Sale.associate = ({ User, SalesProduct }) => {
    Sale.belongsTo(User, { foreignKey: 'userId', as: 'user', through: Sale });
    Sale.belongsTo(User, { foreignKey: 'sellerId', as: 'seller', through: Sale });
    Sale.hasMany(SalesProduct, { foreignKey: 'saleId', as: 'sale' });
  };
  return Sale;
};
