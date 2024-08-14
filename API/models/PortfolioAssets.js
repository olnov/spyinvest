const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const Portfolio = require('./Portfolio'); 
const Asset = require('./Asset'); 

const PortfolioAsset = sequelize.define('PortfolioAsset', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    portfolio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Portfolio,
            key: 'id',
        },
    },
    asset_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Asset,
            key: 'id',
        },
    },
    date_purchase: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_sell: {
        type: DataTypes.DATE,
    },
    quantity_purchase: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity_sell: {
        type: DataTypes.INTEGER,
    },
    price_buy: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    price_sell: {
        type: DataTypes.FLOAT,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'portfolio_assets',
    timestamps: false,
});

Portfolio.belongsToMany(Asset, { through: PortfolioAsset, foreignKey: 'portfolio_id' });
Asset.belongsToMany(Portfolio, { through: PortfolioAsset, foreignKey: 'asset_id' });

console.log("Checking PortfolioAsset model:");
console.log(PortfolioAsset === sequelize.models.PortfolioAsset);

module.exports = PortfolioAsset;
