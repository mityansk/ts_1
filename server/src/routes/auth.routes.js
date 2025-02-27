const router = require('express').Router();
const AuthController = require('../controllers/Auth.Controller');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

router.post('/signIn', AuthController.signIn);
router.post('/signUp', AuthController.signUp);
router.get('/signOut', AuthController.signOut);
router.get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens);

module.exports = router;
