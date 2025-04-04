const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE || 'railway',
  process.env.MYSQLUSER || 'root',
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST || 'mysql.railway.internal',
    port: process.env.MYSQLPORT || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : false
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test connection function
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    return false;
  }
};

// Export both sequelize instance and test function
module.exports = {
  sequelize,
  testConnection
}; 