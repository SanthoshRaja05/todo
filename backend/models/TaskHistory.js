// models/TaskHistory.js
const mongoose = require('mongoose');

const TaskHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  action: {
    type: String,
    required: true, // e.g. 'create', 'update', 'delete', 'clear'
  },
  oldTask: {
    type: String,
  },
  newTask: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TaskHistory', TaskHistorySchema);
