const router = require('express').Router()

const AuthenticationController = require('../controllers/auth')
const { requireSignin } = require('../middlewares/auth')

router.post('/signin', requireSignin, AuthenticationController.signin)
router.post('/signup', AuthenticationController.signup)

module.exports = router
