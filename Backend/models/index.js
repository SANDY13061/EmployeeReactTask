/**
 * @fileoverview MYSQL connection.
 * @author Santhosh Kumar
 * @created 2024-09-26
 */

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => console.log('MySQL connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
