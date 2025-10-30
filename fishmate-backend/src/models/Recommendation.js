module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define('Recommendation', {
    rec_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    status_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING(255) },
    details: { type: DataTypes.TEXT }
  }, {
    tableName: 'recommendations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Recommendation;
};
