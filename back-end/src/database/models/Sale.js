const sale = (DataTypes) => ({
  id: { type: DataTypes.INTEGER, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  sellerId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  deliveryAddress: { type: DataTypes.STRING, allowNull: false },
  deliveryNumber: { type: DataTypes.STRING, allowNull: false },
  saleDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.STRING, allowNull: false },
});

module.exports = (sequelize, DataTypes) => {  
  const Sale = sequelize.define(
    'Sale',
    sale(DataTypes),
    { underscored: true, timestamps: false, tableName: 'sales' },
  );
  Sale.associate = ({ User, SalesProduct }) => {
    Sale.belongsToMany(User, { foreignKey: 'user_id', as: 'user', through: Sale });
    Sale.belongsToMany(User, { foreignKey: 'seller_id', as: 'seller', through: Sale });
    Sale.hasMany(SalesProduct, { foreignKey: 'sale_id', as: 'sale' });
  };
  return Sale;
};
