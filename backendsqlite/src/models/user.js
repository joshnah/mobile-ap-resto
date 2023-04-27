const Sequelize = require('sequelize')
const db = require('./database.js')
const user = db.define(
  'user',
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(128),
      validate: {
        is: /^[a-z\-'\s]{1,128}$/i,
      },
    },
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passhash: {
      type: Sequelize.STRING(60),
      validate: {
        is: /^[0-9a-z\\/$.]{60}$/i,
      },
    },
    phone: {
      type: Sequelize.STRING,
      validate: {
        is: /^[0-9]*$/i,
      },
    },
    address: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
)
module.exports = user
