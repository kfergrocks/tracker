const router = require('express').Router();
const {
  createUser,
  getUser,
  updateUser,
  loginUser,
} = require('../../controllers/user-controller');
const {
  authenticationAndAuthorizationMiddleware,
} = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/create').post(createUser);
router
  .route('/')
  .get(authenticationAndAuthorizationMiddleware, getUser)
  .put(authenticationAndAuthorizationMiddleware, updateUser);
router.route('/login').post(loginUser);

module.exports = router;
