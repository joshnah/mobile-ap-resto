const userModel = require('../models/users.js')
const bcrypt = require('bcrypt');
// Ajouter ici les nouveaux require des nouveaux modèles

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await require('../models/database.js').sync({ force: true })
  console.log('Base de données créée.')
  // Initialise la base avec quelques données
  const passhash = await bcrypt.hash('123456', 2)
  console.log(passhash)
  await userModel.create({
    name: 'Sebastien Viardot', email: 'Sebastien.Viardot@grenoble-inp.fr', passhash
  })
  // Ajouter ici le code permettant d'initialiser par défaut la base de donnée
})()
