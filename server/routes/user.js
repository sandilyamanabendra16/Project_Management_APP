const express = require('express');
const authMiddleware = require('../middleware/auth');
const { GetUser, UpdateUser, addPeople } = require('../controllers/UserController');
const router = express.Router();

router.get(`/:id`,authMiddleware, GetUser );

router.put('/:id', authMiddleware,UpdateUser );

router.put('/add/:id', addPeople )

module.exports = router;
