const express = require('express')
const router = express.Router()
const order = require('../controllers/order.js')
const user = require('../controllers/user.js')

// Get
// Récupérer toutes les commandes
router.get('/api/orders', user.verifyTokenAndFindUser, user.verifyAdmin, order.getOrders)
// Récupérer une commande
router.get('/api/orders/:id', user.verifyTokenAndFindUser, order.verifyAuthorizedUserByOrderId, order.getOrderById)
// Récupérer toutes les commandes d'un client
router.get('/api/users/:userId/orders', user.verifyTokenAndFindUser, order.verifyAuthorizedUserById, order.getOrdersByClientId)

// router.get('/api/orders/delivered', user.verifyTokenAndFindUser, user.verifyAdmin, order.getOrdersDelivered)
// router.get('/api/orders/notDelivered', user.verifyTokenAndFindUser, user.verifyAdmin, order.getOrdersNotDelivered)
// router.get('/api/orders/:date', user.verifyTokenAndFindUser, order.getOrdersByDate)

// Post
router.post('/api/orders', user.verifyTokenAndFindUser, order.newOrder)

// Put
router.put('/api/orders/:id', user.verifyTokenAndFindUser, order.verifyAuthorizedUserByOrderId, order.updateOrder)

// Delete
router.delete('/api/orders/:id', user.verifyTokenAndFindUser, order.verifyAuthorizedUserByOrderId, order.deleteOrder)

module.exports = router
