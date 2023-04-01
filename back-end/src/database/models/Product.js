module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    urlImage: { type: DataTypes.STRING, allowNull: false },
  }, { underscored: true, timestamps: false, tableName: 'products', dialectOptions: { decimalNumbers: true } });
  Product.associate = ({ SalesProduct }) => {
    Product.hasMany(SalesProduct, { foreignKey: 'product_id', as: 'product' });
  };
  return Product;
};