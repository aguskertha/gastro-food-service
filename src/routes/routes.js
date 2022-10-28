const router = require('express').Router();
const foodRouter = require('./food.route')

router.use('/food', foodRouter);

module.exports = router;