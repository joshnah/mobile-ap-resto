/* eslint-disable no-undef */
const Sequelize = require('sequelize');
const db = require('./database.js');
const restaurant = db.define(
  'restaurant',
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
    address: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(128),
      validate: {
        is: /^[0-9]*$/i,
      },
      allowNull: false,
    },
  },
  { timestamps: false }
);
module.exports = restaurant;
