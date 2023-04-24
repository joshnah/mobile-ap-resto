const Sequelize = require("sequelize");
const db = require("./database.js");
const orderProduct = db.define(
  "orderProduct",
  {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = orderProduct;
