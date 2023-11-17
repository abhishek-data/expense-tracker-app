const express = require('express')

const router = express.Router()

const authController = require('../controllers/authController')

router.post('/login', authController.login)

router.post('/signup', authController.signup)

router.post('/password/forgotpassword', authController.forgotPassword)

module.exports = router