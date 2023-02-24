const router = require('express').Router();
const dashboardRouter = require('../routes/dashboard.route')
const architectureRouter = require('../routes/architecture.route')
const modelSiameseRouter = require('../routes/model-siamese.route')
const userRouter = require('../routes/user.route')
const foodRouter = require('../routes/food.route')
const {ensureAuthenticated} = require('../../middleware/auth');

router.use('/model-siamese', ensureAuthenticated, modelSiameseRouter);
router.use('/architecture', ensureAuthenticated, architectureRouter);
router.use('/dashboard', ensureAuthenticated, dashboardRouter);
router.use('/foods', ensureAuthenticated, foodRouter);
router.use('/users', userRouter);

module.exports = router;