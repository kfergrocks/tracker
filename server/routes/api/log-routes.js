const router = require('express').Router();
const {
  getLogKeys,
  getLogs,
  addLogs,
} = require('../../controllers/logs-controller');
const {
  authenticationMiddleware,
  authenticationAndAuthorizationMiddleware,
} = require('../../utils/auth');

router.route('/keys').get(authenticationMiddleware, getLogKeys);
router
  .route('/')
  .get(authenticationAndAuthorizationMiddleware, getLogs)
  .post(authenticationAndAuthorizationMiddleware, addLogs);
module.exports = router;
