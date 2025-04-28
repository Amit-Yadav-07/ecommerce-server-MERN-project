const express = require('express');
const router = express.Router()
const { auth, isAdmin } = require('../middleware/auth.js')

const { Register, Login, admin, Logout, currentUser } = require('../Controllers/userController.js')

router.post('/register', Register);
router.post('/login', Login)
router.get('/logout', Logout)

router.get('/admin', auth, isAdmin, admin)

router.get('/current-user', auth, currentUser)

module.exports = router;