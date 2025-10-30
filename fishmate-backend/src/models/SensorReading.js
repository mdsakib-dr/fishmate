module.exports = (sequelize, DataTypes) => {
  const SensorReading = sequelize.define('SensorReading', {
    reading_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    pond_id: { type: DataTypes.INTEGER, allowNull: false },
    temperature_c: { type: DataTypes.DECIMAL(5,2) },
    ph_level: { type: DataTypes.DECIMAL(4,2) },
    dissolved_oxygen: { type: DataTypes.DECIMAL(5,2) },
    ammonia: { type: DataTypes.DECIMAL(5,2) },
    nitrite: { type: DataTypes.DECIMAL(5,2) },
    turbidity: { type: DataTypes.DECIMAL(5,2) },
    reading_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'sensor_readings',
    timestamps: false
  });

  return SensorReading;
};
