const router = require('express').Router()
router.use(require('./user'))
router.use(require('./product'))
router.use(require('./restaurant'))
router.use(require('./order'))
module.exports = router
