const sequelize = require('./database');
const Product = require('./models/Product');

async function createTable() {
  await sequelize.sync({ force: true });
  console.log('Database & tables created!');
}

createTable();
