const express = require('express')
const AuthController = require('../controller/AuthController')

const router = express.Router();

router.post('/register', AuthController.registration)
router.post('/login', AuthController.login)


module.exports = router