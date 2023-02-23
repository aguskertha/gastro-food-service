const router = require('express').Router()
const { createFood, getFoods, getById, getByCode, deleteById, deleteFoods, deleteByCode, convImage, createQueryBase64, updateFood } = require('./../controllers/food.controller')

router.post('/', createFood)
router.post('/:foodId/update', updateFood)
router.get('/', getFoods)
router.get('/code/:foodCode', getByCode)
router.delete('/:foodId', deleteById)
router.delete('/code/:foodCode', deleteByCode)
router.delete('/', deleteFoods)
router.get('/conv', convImage)
router.post('/query', createQueryBase64)
router.get('/:foodId', getById)

module.exports = router
