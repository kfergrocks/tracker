const router = require('express').Router();
const userRoutes = require('./user-routes');
const logRoutes = require('./log-routes');

router.use('/user', userRoutes);
router.use('/logs', logRoutes);

module.exports = router;
