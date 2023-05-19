const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const db = require('./database.js');
const product = db.define(
  'product',
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('burger', 'boisson', 'frites'),
      allowNull: false,
      validate: {
        isIn: [['burger', 'boisson', 'frites']],
      },
      values: ['burger', 'boisson', 'frites'],
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(128),
    },
    image: {
      type: Sequelize.STRING(128),
    },
  },
  { timestamps: false }
);
module.exports = product;
