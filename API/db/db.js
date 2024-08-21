const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

// Testing connection
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("[DB-001] Successfully connected to the database.");
  } catch (error) {
    console.error("[DB-002] Error connecting to the database:", error);
  }
};

dbConnection();

// Synchronizing DB
const syncDatabase = async (force_mode=false) => {
  try {
    await sequelize.sync({ force: force_mode }); // Use `force: true` to drop and recreate tables; remove it to only create missing tables
    console.log("[DB-003] Database synced successfully.");
  } catch (error) {
    console.error("[DB-004] Error syncing database:", error);
  }
};

const dropConstraintOnStart = async () => {
  try {
    await sequelize.query(`
      ALTER TABLE portfolio_assets 
      DROP CONSTRAINT IF EXISTS portfolio_assets_portfolio_id_asset_id_key;
    `);
    console.log('[DB-005] Constraint dropped successfully.');
  } catch (error) {
    console.error('[DB-006] Error dropping constraint:', error);
  }
};

dropConstraintOnStart();

module.exports = { sequelize, syncDatabase };
