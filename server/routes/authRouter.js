const router = require('express').Router();
const Auth = require('../controller/authController');


router.post('/register', Auth.registerUser);
router.post('/login', Auth.loginUser);
router.get('/logout',Auth.logoutUser);

module.exports = router;