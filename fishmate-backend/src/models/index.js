const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
const Pond = require('./Pond')(sequelize, DataTypes);
const SensorReading = require('./SensorReading')(sequelize, DataTypes);
const FishHealthStatus = require('./HealthStatus')(sequelize, DataTypes);
const Recommendation = require('./Recommendation')(sequelize, DataTypes);
const Notification = require('./Notification')(sequelize, DataTypes);
const VerificationRequest = require('./VerificationRequest')(sequelize, DataTypes);

// Associations
User.hasMany(Pond, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Pond.belongsTo(User, { foreignKey: 'user_id' });

Pond.hasMany(SensorReading, { foreignKey: 'pond_id', onDelete: 'CASCADE' });
SensorReading.belongsTo(Pond, { foreignKey: 'pond_id' });

Pond.hasMany(FishHealthStatus, { foreignKey: 'pond_id', onDelete: 'CASCADE' });
FishHealthStatus.belongsTo(Pond, { foreignKey: 'pond_id' });

SensorReading.hasOne(FishHealthStatus, { foreignKey: 'reading_id' });
FishHealthStatus.belongsTo(SensorReading, { foreignKey: 'reading_id' });

FishHealthStatus.hasMany(Recommendation, { foreignKey: 'status_id', onDelete: 'CASCADE' });
Recommendation.belongsTo(FishHealthStatus, { foreignKey: 'status_id' });

User.hasMany(Notification, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(VerificationRequest, { foreignKey: 'user_id', onDelete: 'CASCADE' });
VerificationRequest.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Pond,
  SensorReading,
  FishHealthStatus,
  Recommendation,
  Notification,
  VerificationRequest
};
