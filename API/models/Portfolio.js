const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const User = require('./User'); // Import User model

const Portfolio = sequelize.define('Portfolio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(250),
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'portfolios',
    timestamps: false,
});

User.hasMany(Portfolio, { foreignKey: 'user_id' });
Portfolio.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Portfolio;
