const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");
// Ajouter ici les nouveaux require des nouveaux modèles
const productModel = require("../models/product.js");
const orderModel = require("../models/order.js");
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
  await productModel.create({
    name: "My burger",
    type: "burger",
    price: 8.75,
    description: "A very good burger",
  });

  const o = await orderModel.create({
    status: false,
    date: new Date()
  });


  const o1 = await orderModel.create({
    status: false,
    date: new Date()
  });
  o.setUser(c);
  o1.setUser(c);
})();
