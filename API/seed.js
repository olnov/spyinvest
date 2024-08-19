require('dotenv').config();
const { sequelize } = require('./db/db');
const User = require('./models/User');
const Portfolio = require('./models/Portfolio');
const Asset = require('./models/Asset');
const PortfolioAsset = require('./models/PortfolioAssets');
const { faker } = require('@faker-js/faker'); // Import Faker.js

const seedDatabase = async () => {
  try {
    // Sync database (use force: true to drop tables before creating them)
    await sequelize.sync({ force: true });

    // Seed Users
    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birth_date: faker.date.past(50, new Date(2000, 0, 1)),
        registred_at: faker.date.recent(),
      });

      // Seed Portfolios for each user
      for (let j = 0; j < 3; j++) {
        const portfolio = await Portfolio.create({
          title: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          user_id: user.id,
          created_at: faker.date.recent(),
        });

        // Seed Assets
        // const assets = [];
        // for (let k = 0; k < 5; k++) {
        //   const asset = await Asset.create({
        //     asset: faker.finance.currencyName(),
        //   });
        //   assets.push(asset);
        // }

        // Seed PortfolioAssets
        for (const asset of assets) {
          await PortfolioAsset.create({
            portfolio_id: portfolio.id,
            asset_id: asset.id,
            date_purchase: faker.date.past(2),
            date_sell: faker.datatype.boolean() ? faker.date.recent() : null,
            quantity_purchase: faker.datatype.number({ min: 1, max: 100 }),
            quantity_sell: faker.datatype.boolean() ? faker.datatype.number({ min: 1, max: 100 }) : null,
            price_buy: faker.finance.amount(10, 1000, 2),
            price_sell: faker.datatype.boolean() ? faker.finance.amount(10, 1000, 2) : null,
            created_at: faker.date.recent(),
          });
        }
      }
    }

    console.log('Database has been seeded successfully!');
    await sequelize.close(); // Close the database connection
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
