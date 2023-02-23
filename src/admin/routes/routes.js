const router = require('express').Router();
const dashboardRouter = require('../routes/dashboard.route')
const userRouter = require('../routes/user.route')
const foodRouter = require('../routes/food.route')
const {ensureAuthenticated} = require('../../middleware/auth');

router.use('/dashboard', ensureAuthenticated, dashboardRouter);
router.use('/foods', foodRouter);
router.use('/users', userRouter);

module.exports = router;