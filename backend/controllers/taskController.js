// controllers/taskController.js

const Task = require('../models/Task');
const TaskHistory = require('../models/TaskHistory'); // <-- NEW import

// Create a new task (store task with associated username)
exports.createTask = async (req, res) => {
  const { username, task } = req.body;
  try {
    const newTask = new Task({ username, task });
    await newTask.save();

    // LOG: user created a task
    await TaskHistory.create({
      username,
      action: 'create',
      newTask: task,
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Get all tasks for a specific user (username passed as query parameter)
exports.getTasks = async (req, res) => {
  const { username } = req.query;
  try {
    const tasks = await Task.find({ username });
    return res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  try {
    // Find the old doc so we know the old text
    const oldDoc = await Task.findById(id);
    if (!oldDoc) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, completed },
      { new: true }
    );

    // LOG: user updated a task
    await TaskHistory.create({
      username: oldDoc.username,
      action: 'update',
      oldTask: oldDoc.task,
      newTask: task,
    });

    return res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the doc so we know what was deleted
    const doc = await Task.findById(id);
    if (!doc) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(id);

    // LOG: user deleted a task
    await TaskHistory.create({
      username: doc.username,
      action: 'delete',
      oldTask: doc.task,
    });

    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Clear all tasks for a user
exports.clearTasks = async (req, res) => {
  const { username } = req.query;
  try {
    await Task.deleteMany({ username });

    // LOG: user cleared all tasks
    await TaskHistory.create({
      username,
      action: 'clear',
      oldTask: 'All tasks cleared',
    });

    return res.json({ message: 'All tasks cleared' });
  } catch (error) {
    console.error('Error clearing tasks:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// NEW: getTaskHistory to retrieve all changes for a user
exports.getTaskHistory = async (req, res) => {
  const { username } = req.query;
  try {
    const history = await TaskHistory.find({ username }).sort({ timestamp: -1 });
    return res.json(history);
  } catch (error) {
    console.error('Error fetching task history:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
