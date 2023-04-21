const express = require('express')
const router = express.Router()
const product = require('../controllers/product.js')
const user = require('../controllers/user.js')

router.get('/api/products', user.verifyTokenAndFindUser, product.getProducts)
// router.post('/api/users', user.newUser)

// router.get('/api/users/:email', user.getUserByEmail)
// router.put('/api/users', user.updateUser)
// router.delete('/api/users/:id', user.deleteUser)

module.exports = router
