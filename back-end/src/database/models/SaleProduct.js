module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  }, { underscored: true, timestamps: false, tableName: 'products' });
  
  SalesProduct.associate = ({ Product, Sale }) => {
    SalesProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
    SalesProduct.belongsTo(Sale, { foreignKey: 'sale_id', as: 'sale' });
  };
  return SalesProduct;
};