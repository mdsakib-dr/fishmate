module.exports = (sequelize, DataTypes) => {
  const Pond = sequelize.define('Pond', {
    pond_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    pond_name: { type: DataTypes.STRING(100) },
    location: { type: DataTypes.STRING(255) },
    area_sq_m: { type: DataTypes.DECIMAL(10,2) }
  }, {
    tableName: 'ponds',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Pond;
};
