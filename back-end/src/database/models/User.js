module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  }, { underscored: true, timestamps: false, tableName: 'users' });
  User.associate = ({ Sale }) => {
    User.hasMany(Sale, { foreignKey: 'userId', as: 'user' });
    // User.hasMany(Sale, { foreignKey: 'seller_id', as: 'seller' });
  };
  return User;
};
