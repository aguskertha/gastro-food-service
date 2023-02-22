const router = require('express').Router();
const { renderFoodPage, registerFoodPage, renderCreateFoodPage } = require('./../controllers/food-page.controller');

router.get('/', renderFoodPage);
router.post('/create', registerFoodPage);
router.get('/create', renderCreateFoodPage);

module.exports = router;