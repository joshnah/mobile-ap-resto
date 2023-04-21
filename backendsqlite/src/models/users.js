const Sequelize = require('sequelize')
const db = require('./database.js')
const users = db.define('users', {
  userId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(128),
    validate: {
      is: /^[a-z\-'\s]{1,128}$/i
    }
  },
  email: {
    type: Sequelize.STRING(128),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passhash: {
    type: Sequelize.STRING(60),
    validate: {
      is: /^[0-9a-z\\/$.]{60}$/i
    }
  },
  phone: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, { timestamps: false })
module.exports = users