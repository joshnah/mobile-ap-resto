const router = require('express').Router()
router.use(require('./user'))
router.use(require('./product'))
router.use(require('./restaurant'))
module.exports = router
