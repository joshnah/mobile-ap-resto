const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')

router.get('/api/users', user.getUsers)
router.post('/api/users', user.newUser)

router.get('/api/users/:email', user.getUserByEmail)
router.put('/api/users', user.updateUser)
router.delete('/api/users/:id', user.deleteUser)

router.post('/login', user.login)

module.exports = router
