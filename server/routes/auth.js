const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { loginUser, registerUser, Getuser } = require('../controllers/AuthController');


// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

//Get user
router.get('/', auth, Getuser);
module.exports = router;
