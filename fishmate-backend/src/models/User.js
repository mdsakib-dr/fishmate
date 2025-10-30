module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    full_name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verification_token: { type: DataTypes.STRING(255), allowNull: true }
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return User;
};
