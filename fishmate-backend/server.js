const app = require('./src/app');
const { sequelize } = require('./src/models');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected.');

    await sequelize.sync({ alter: true });
    console.log('DB synced.');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
})();
