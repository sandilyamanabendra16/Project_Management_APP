const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask, shareTask, GetTaskbyId } = require('../controllers/TaskController');

// Get tasks (with filter)
router.get('/', auth, getTasks);

// Get task by id
router.get('/:id', GetTaskbyId);
// Create a task
router.post('/', auth, createTask);

// Update a task
router.put('/:id', auth, updateTask);

// Delete a task
router.delete('/:id', auth, deleteTask);

// Shared task
router.put('/share/:id', auth, shareTask);

module.exports = router;
