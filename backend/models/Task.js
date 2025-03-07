// models/Task.js

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Mongoose will automatically add `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', TaskSchema);
