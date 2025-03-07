// routes/taskRoutes.js

const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  clearTasks,
  getTaskHistory, // NEW
} = require('../controllers/taskController');

const router = express.Router();

// Existing routes...
router.post('/', createTask);
router.get('/', getTasks);

// Put /clear BEFORE /:id
router.delete('/clear', clearTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// NEW: route for history
router.get('/history', getTaskHistory);

module.exports = router;
