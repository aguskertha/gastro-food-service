const router = require('express').Router()
const { renderArchitecturePage, uploadArchitecture } = require('../controllers/architecture-page.controller')

router.get('/', renderArchitecturePage)
router.post('/upload', uploadArchitecture)

module.exports = router
