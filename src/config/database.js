const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('messagerie_instant', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
