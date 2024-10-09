// backend/models/Product.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Ajuste o caminho conforme necessário

class Product extends Model {}

Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: { // Adicionando a coluna de categoria
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Product',
});

module.exports = Product;
