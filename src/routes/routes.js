const router = require('express').Router();
const foodRouter = require('./food.route')
const adminRouter = require('../admin/routes/routes')

router.use('/food', foodRouter);
router.use('/admin', adminRouter);

module.exports = router;