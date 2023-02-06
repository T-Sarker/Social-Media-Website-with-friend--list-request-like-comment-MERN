const express = require('express')
const AuthController = require('../controller/AuthController')
const auth = require('../middlewares/auth')
const router = express.Router();

router.post('/register', AuthController.registration)
router.post('/login', AuthController.login)
router.get('/me', auth, AuthController.getCurrentUserData)


module.exports = router