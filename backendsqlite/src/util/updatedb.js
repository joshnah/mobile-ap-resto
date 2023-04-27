const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");
// Ajouter ici les nouveaux require des nouveaux modèles
const productModel = require("../models/product.js");
const orderModel = require("../models/order.js");
const restaurantModel= require("../models/restaurant.js");
// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await require("../models/database.js").sync({ force: true });
  console.log("Base de données créée.");
  // Initialise la base avec quelques données
  const c = await userModel.create({
    name: "admin",
    email: "admin@gmail.com",
    passhash: await bcrypt.hash("admin", 2),
    isAdmin: true,
  });

  await userModel.create({
    name: "test",
    email: "test@gmail.com",
    passhash: await bcrypt.hash("test", 2),
    isAdmin: false,
  });

  // Ajouter ici le code permettant d'initialiser par défaut la base de donnée
  const product = await productModel.create({
    name: "My burger",
    type: "burger",
    price: 8.75,
    description: "A very good burger",
  });

  const order1 = await orderModel.create({
    status: false,
    date: new Date()
  });


  const order2 = await orderModel.create({
    status: false,
    date: new Date()
  });
  order1.setUser(c);
  order2.setUser(c);

  const restaurant1 = await restaurantModel.create({
    name: "My restaurant",
    address: "My address",
    phone: "0123456789",
  });

  const restaurant2 = await restaurantModel.create({
    name: "My restaurant 2",
    address: "My address 2",
    phone: "999999999",
  });


  await order1.addProduct(product, { through: { quantity: 2 }});
  await order2.addProduct(product, { through: { quantity: 1 }});

  await order1.setRestaurant(restaurant1);
  await order2.setRestaurant(restaurant2);

})();
