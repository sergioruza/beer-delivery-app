module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    urlImage: { type: DataTypes.STRING, allowNull: false },
  }, { underscored: true, timestamps: false, tableName: 'products' });
  Product.associate = ({ SalesProducts }) => {
    Product.belongsToMany(SalesProducts, { foreignKey: 'product_id', as: 'product' });
  };
  return Product;
};