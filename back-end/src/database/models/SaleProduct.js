module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  }, { underscored: true, timestamps: false, tableName: 'sales_products' });
  
  SalesProduct.associate = ({ Product, Sale }) => {
    SalesProduct.belongsToMany(Product, { foreignKey: 'product_id', as: 'product' });
    SalesProduct.belongsToMany(Sale, { foreignKey: 'sale_id', as: 'sales' });
  };
  return SalesProduct;
};