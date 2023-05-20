const userModel = require('../models/user.js');
const bcrypt = require('bcrypt');
// Ajouter ici les nouveaux require des nouveaux modèles
const productModel = require('../models/product.js');
const orderModel = require('../models/order.js');
const restaurantModel = require('../models/restaurant.js');
const PRODUCTS_MOCK = require('../mocks/products.js');
module.exports = {
  async initDb() {
    // Regénère la base de données
    await require('../models/database.js').sync({ force: true });
    console.log('Base de données créée.');
    // Initialise la base avec quelques données
    await userModel.create({
      name: 'admin',
      email: 'admin@gmail.com',
      passhash: await bcrypt.hash('admin', 2),
      isAdmin: true,
    });

    const c = await userModel.create({
      name: 'test',
      email: 'test@gmail.com',
      passhash: await bcrypt.hash('test', 2),
      isAdmin: false,
    });

    await userModel.create({
      name: 'test two',
      email: 'test1@gmail.com',
      passhash: await bcrypt.hash('test1', 2),
      isAdmin: false,
    });

    await productModel.create(PRODUCTS_MOCK[0]);
    await productModel.create(PRODUCTS_MOCK[1]);
    await productModel.create(PRODUCTS_MOCK[2]);

    const order1 = await orderModel.create({
      date: new Date(),
      address: '7 lotissement la riverate 1, 38420 Le Versoud',
      status: true,
    });

    const order2 = await orderModel.create({
      date: new Date(),
      address: '7 avenue du 14 juillet 1789, 38420 Le Versoud',
      status: false,
    });
    order1.setUser(c);
    order2.setUser(c);

    const restaurant1 = await restaurantModel.create({
      name: 'My restaurant',
      address: 'My address',
      phone: '0123456789',
    });

    const restaurant2 = await restaurantModel.create({
      name: 'My restaurant 2',
      address: 'My address 2',
      phone: '999999999',
    });

    await order1.addProduct(await productModel.findByPk(1), {
      through: { quantity: 2 },
    });
    await order1.addProduct(await productModel.findByPk(2), {
      through: { quantity: 1 },
    });
    await order1.addProduct(await productModel.findByPk(3), {
      through: { quantity: 1 },
    });

    await order2.addProduct(await productModel.findByPk(1), {
      through: { quantity: 1 },
    });
    await order2.addProduct(await productModel.findByPk(2), {
      through: { quantity: 1 },
    });
    await order2.addProduct(await productModel.findByPk(3), {
      through: { quantity: 10 },
    });
    // await order2.addProduct(product1, { through: { quantity: 1 } });

    await order1.setRestaurant(restaurant1);
    await order2.setRestaurant(restaurant2);
  },
};
