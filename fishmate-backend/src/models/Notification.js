module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    notification_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT },
    type: { type: DataTypes.ENUM('alert','recommendation','system'), defaultValue: 'alert' },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'notifications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Notification;
};
