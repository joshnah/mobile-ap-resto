const router = require('express').Router()
router.use(require('./user'))
router.use(require('./product'))
module.exports = router
