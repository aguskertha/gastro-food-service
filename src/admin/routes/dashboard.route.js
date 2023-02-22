const router = require('express').Router()
const { getDashboards } = require('./../controllers/dashboard.controller')

router.get('/', getDashboards)

module.exports = router
