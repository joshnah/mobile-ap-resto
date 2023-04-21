const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')
const db = require('./database.js')
const products = db.define('products', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('burger', 'boisson', 'frites'),
    allowNull: false,
    validate: {
      isIn: [['burger', 'boisson', 'frites']]
    },
    values: ['burger', 'boisson', 'frites'],
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(128)
  },
  image: {
    type: DataTypes.BLOB
  }
}, { timestamps: false })
module.exports = products