const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Asset = sequelize.define('Asset', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    asset: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: 'assets',
    timestamps: false,
});

module.exports = Asset;
