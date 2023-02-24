const router = require('express').Router()
const { renderModelSiamesePage, uploadModelSiamese } = require('../controllers/model-siamese-page.controller')

router.get('/', renderModelSiamesePage)
router.post('/upload', uploadModelSiamese)

module.exports = router
