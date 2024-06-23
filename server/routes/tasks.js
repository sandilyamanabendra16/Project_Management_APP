const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/TaskController');

// Get tasks (with filter)
router.get('/', auth, getTasks);
// Create a task
router.post('/', auth, createTask);

// Update a task
router.put('/:id', auth, updateTask);

// Delete a task
router.delete('/:id', auth, deleteTask);

module.exports = router;
