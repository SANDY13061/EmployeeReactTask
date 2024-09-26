/**
 * @fileoverview User Table Model.
 * @author Santhosh Kumar
 * @created 2024-09-26
 */

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const user = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'users'
});

module.exports = user;
