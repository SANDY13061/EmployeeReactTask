const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const employee = sequelize.define('Employee', {
    f_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    f_Email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    f_Mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    f_Designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    f_Gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false
    },
    f_Course: {
        type: DataTypes.STRING,
        allowNull: false
    },
    f_Image: {
        type: DataTypes.BLOB('long'), // Change to BLOB to store binary data
        allowNull: true // Make it optional if the image isn't mandatory
    }
}, {
    timestamps: true,
    createdAt: 'f_CreatedDate',
    updatedAt: false,
    tableName: 'employees'
});

module.exports = employee;
