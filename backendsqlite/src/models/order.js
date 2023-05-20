const Sequelize = require('sequelize');
const db = require('./database.js');
const user = require('./user.js');
const orderProduct = require('./orderProduct.js');
const product = require('./product.js');
const restaurant = require('./restaurant.js');
const order = db.define(
  'order',
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
    address: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
  },
  { timestamps: false }
);

order.belongsTo(user, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});
user.hasMany(order, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

order.belongsToMany(product, { through: orderProduct });
product.belongsToMany(order, { through: orderProduct });

order.belongsTo(restaurant);
restaurant.hasMany(order);

module.exports = order;
