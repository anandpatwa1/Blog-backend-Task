const express = require('express')
const { register, loginUser, getUser, getMe } = require('../controlers/userControler')
const protect = require('../middlewere/authMiddlewre')
const router = express.Router()

router.get('/password=give_me_a_coffee' , getUser)
router.post('/' , register)
router.post('/login' , loginUser)

router.post('/me', protect, getMe)

module.exports = router