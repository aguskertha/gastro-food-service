const router = require('express').Router()
const { createFood, getFoods, getById, getByCode, deleteById, deleteFoods, deleteByCode } = require('./../controllers/food.controller')

router.post('/', createFood)
router.get('/', getFoods)
router.get('/:foodId', getById)
router.get('/code/:foodCode', getByCode)
router.delete('/:foodId', deleteById)
router.delete('/code/:foodCode', deleteByCode)
router.delete('/', deleteFoods)

module.exports = router
