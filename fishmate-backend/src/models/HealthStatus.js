module.exports = (sequelize, DataTypes) => {
  const FishHealthStatus = sequelize.define('FishHealthStatus', {
    status_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    pond_id: { type: DataTypes.INTEGER, allowNull: false },
    reading_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.ENUM('Healthy','At Risk','Critical'), allowNull: false },
    reason: { type: DataTypes.TEXT }
  }, {
    tableName: 'fish_health_status',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return FishHealthStatus;
};
