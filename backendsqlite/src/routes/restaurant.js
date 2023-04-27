const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')
const restaurant = require('../controllers/restaurant.js')
// Get
router.get(
  '/api/restaurants',
  user.verifyTokenAndFindUser,
  restaurant.getRestaurants
)

// Post
router.post(
  '/api/restaurants/',
  user.verifyTokenAndFindUser,
  user.verifyAdmin,
  restaurant.newRestaurant
)

// Put
router.put(
  '/api/restaurants/:id',
  user.verifyTokenAndFindUser,
  user.verifyAdmin,
  restaurant.updateRestaurant
)

// Delete
router.delete(
  '/api/restaurants/:id',
  user.verifyTokenAndFindUser,
  user.verifyAdmin,
  restaurant.deleteRestaurant
)

module.exports = router
