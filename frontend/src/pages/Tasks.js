import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../css/Tasks.css'; // If you have additional custom CSS

function Tasks() {
  const [username] = useState(localStorage.getItem('username') || '');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Fetch tasks when 'username' changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) return; // If no username, skip fetch
        const { data } = await axios.get(
          `http://localhost:5000/api/tasks?username=${username}`
        );
        setTasks(data);
      } catch (error) {
        toast.error('Failed to fetch tasks.', { position: 'top-right' });
      }
    };
    fetchData();
  }, [username]);

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const { data } = await axios.post('http://localhost:5000/api/tasks', {
        username,
        task: newTask,
      });
      setTasks((prev) => [...prev, data]);
      setNewTask('');
      toast.success('Task added!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to add task.', { position: 'top-right' });
    }
  };

  // Start editing a task
  const handleEditTask = (taskId, currentText) => {
    setEditingTaskId(taskId);
    setEditingText(currentText);
  };

  // Save edited task
  const handleSaveTask = async (taskId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { task: editingText }
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === data._id ? data : t))
      );
      setEditingTaskId(null);
      setEditingText('');
      toast.success('Task updated!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to update task.', { position: 'top-right' });
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingText('');
  };

  // Toggle task completion
  const handleToggleComplete = async (task) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { task: task.task, completed: !task.completed }
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === data._id ? data : t))
      );
    } catch (error) {
      toast.error('Failed to toggle task.', { position: 'top-right' });
    }
  };

  // Delete a single task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      toast.success('Task deleted!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to delete task.', { position: 'top-right' });
    }
  };

  // Clear all tasks
  const handleClearAll = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/clear?username=${username}`
      );
      setTasks([]);
      toast.success('All tasks cleared!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to clear tasks.', { position: 'top-right' });
    }
  };

  return (
    <div className="container-fluid tasks-page bg-light min-vh-100">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        {/* Main tasks area */}
        <div className="col-md-10 py-4">
          <h2 className="mb-4 text-center">Task Manager</h2>

          <div className="card shadow-sm">
            {/* Card Header: Add Task + Clear All */}
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="fw-bold">Add a New Task</span>
              <button className="btn btn-danger btn-sm" onClick={handleClearAll}>
                Clear All
              </button>
            </div>

            {/* Card Body: Add Task Form + Task List */}
            <div className="card-body">
              {/* Add Task Form */}
              <form className="row g-2 mb-4" onSubmit={handleAddTask}>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-success">
                    Add
                  </button>
                </div>
              </form>

              {/* Task List */}
              {tasks.length === 0 ? (
                <p className="text-muted">No tasks found. Add some!</p>
              ) : (
                <ul className="list-group">
                  {tasks.map((task) => (
                    <li
                      key={task._id}
                      className={`list-group-item d-flex align-items-center justify-content-between ${
                        task.completed ? 'completed-task' : ''
                      }`}
                    >
                      {/* Task text or editing input */}
                      <div className="task-text">
                        {editingTaskId === task._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                        ) : (
                          <span>{task.task}</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="task-actions">
                        {/* Toggle Complete */}
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => handleToggleComplete(task)}
                        >
                          {task.completed ? <FaTimes /> : <FaCheck />}
                        </button>

                        {/* Edit / Save */}
                        {editingTaskId === task._id ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-1"
                              onClick={() => handleSaveTask(task._id)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-sm btn-warning me-1"
                            onClick={() => handleEditTask(task._id, task.task)}
                          >
                            <FaEdit />
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
