const Sequelize = require("sequelize");
const db = require("./database.js");
const user = require("./user.js");
const order = db.define(
  "order",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

order.belongsTo(user);
user.hasMany(order);
module.exports = order;
