module.exports = (sequelize, DataTypes) => {
  const VerificationRequest = sequelize.define('VerificationRequest', {
    token_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.STRING(255), unique: true },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    used: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'verification_requests',
    timestamps: false
  });

  return VerificationRequest;
};
