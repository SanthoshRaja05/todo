import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaStar,
  FaRegStar
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../css/Tasks.css'; // Our custom CSS

function Tasks() {
  const [username] = useState(localStorage.getItem('username') || '');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newRemainderDate, setNewRemainderDate] = useState('');
  
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingRemainderDate, setEditingRemainderDate] = useState('');

  // Stats
  const [completedCount, setCompletedCount] = useState(0);
  const [sortBy, setSortBy] = useState('none'); // 'none' | 'alphabetical' | 'completed'

  // Pagination
  const tasksPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  // New Features
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch tasks on mount (or when username changes)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) return;
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

  // Filter, sort, and update stats whenever tasks, searchTerm or sortBy change
  useEffect(() => {
    let result = tasks;

    // Filter by search term
    if (searchTerm.trim()) {
      result = tasks.filter((t) =>
        t.task.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort if needed
    if (sortBy === 'alphabetical') {
      result = [...result].sort((a, b) => a.task.localeCompare(b.task));
    } else if (sortBy === 'completed') {
      result = [...result].sort((a, b) => a.completed - b.completed);
    }

    setFilteredTasks(result);

    // Update stats
    const completed = tasks.filter((t) => t.completed).length;
    setCompletedCount(completed);

    // Adjust pagination if needed
    const totalPages = Math.ceil(result.length / tasksPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tasks, searchTerm, sortBy, currentPage, tasksPerPage]);

  // Pagination logic
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const displayedTasks = filteredTasks.slice(startIndex, endIndex);
  const incompleteCount = tasks.length - completedCount;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Add a new task (without description)
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const { data } = await axios.post('http://localhost:5000/api/tasks', {
        username,
        task: newTask,
        remainderDate: newRemainderDate,
        favourite: false
      });
      setTasks((prev) => [...prev, data]);
      setNewTask('');
      setNewRemainderDate('');
      toast.success('Task added!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to add task.', { position: 'top-right' });
    }
  };

  // Start editing a task (without description)
  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setEditingText(task.task);
    setEditingRemainderDate(task.remainderDate || '');
  };

  // Save edited task
  const handleSaveTask = async (taskId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          task: editingText,
          remainderDate: editingRemainderDate
        }
      );
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      setEditingTaskId(null);
      setEditingText('');
      setEditingRemainderDate('');
      toast.success('Task updated!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to update task.', { position: 'top-right' });
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingText('');
    setEditingRemainderDate('');
  };

  // Toggle task completion
  const handleToggleComplete = async (task) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          task: task.task,
          remainderDate: task.remainderDate,
          completed: !task.completed,
          favourite: task.favourite
        }
      );
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    } catch (error) {
      toast.error('Failed to toggle task.', { position: 'top-right' });
    }
  };

  // Toggle favourite flag
  const handleToggleFavourite = async (task) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          task: task.task,
          remainderDate: task.remainderDate,
          completed: task.completed,
          favourite: !task.favourite
        }
      );
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      toast.success('Favourite toggled!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to toggle favourite.', { position: 'top-right' });
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

  const handleClearAll = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/clear?username=${username}`
      );
      setTasks([]);
      toast.success('All tasks cleared!', { position: 'top-right' });
      setCurrentPage(1);
    } catch (error) {
      toast.error('Failed to clear tasks.', { position: 'top-right' });
    }
  };

  const handleMarkAllCompleted = async () => {
    try {
      const updated = [];
      for (let t of tasks) {
        if (!t.completed) {
          const res = await axios.put(`http://localhost:5000/api/tasks/${t._id}`, {
            task: t.task,
            remainderDate: t.remainderDate,
            completed: true,
            favourite: t.favourite
          });
          updated.push(res.data);
        } else {
          updated.push(t);
        }
      }
      setTasks(updated);
      toast.success('All tasks marked as completed!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to mark all as completed.', { position: 'top-right' });
    }
  };

  // Utility to calculate days left from remainderDate
  const getDaysLeft = (dateString) => {
    const now = new Date();
    const remDate = new Date(dateString);
    const diffTime = remDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
          <h4 className="mb-4 text-center">Tasks</h4>

          {/* Stats Card */}
          <div className="card stats-card mb-4">
            <div className="card-body d-flex justify-content-around text-center">
              <div>
                <h5 className="mb-1">{tasks.length}</h5>
                <small className="text-muted">Total Tasks</small>
              </div>
              <div>
                <h5 className="mb-1">{completedCount}</h5>
                <small className="text-muted">Completed</small>
              </div>
              <div>
                <h5 className="mb-1">{incompleteCount}</h5>
                <small className="text-muted">Incomplete</small>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            {/* Card Header: Add Task + Clear All + Sort By + Mark All Completed */}
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
              <div className="d-flex align-items-center mb-2 mb-sm-0">
                <span className="fw-bold me-3">Add a New Task</span>
                <button className="btn btn-danger btn-sm me-2" onClick={handleClearAll}>
                  Clear All
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={handleMarkAllCompleted}>
                  Mark All Completed
                </button>
              </div>
              <div className="mt-2 mt-sm-0 d-flex flex-wrap align-items-center">
                {/* Local search */}
                <div className="me-3 mb-2 mb-sm-0">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Sort By */}
                <div className="d-flex align-items-center">
                  <label htmlFor="sortBy" className="me-2 fw-bold">
                    Sort By:
                  </label>
                  <select
                    id="sortBy"
                    className="form-select form-select-sm d-inline-block w-auto"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="none">None</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="completed">Completion</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card Body: Add Task Form + Task List */}
            <div className="card-body">
              {/* Add Task Form */}
              <form className="row g-2 mb-4" onSubmit={handleAddTask}>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="date"
                    className="form-control"
                    value={newRemainderDate}
                    onChange={(e) => setNewRemainderDate(e.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-success">
                    Add
                  </button>
                </div>
              </form>

              {/* Task List */}
              {displayedTasks.length === 0 ? (
                <p className="text-muted">No tasks found. Add some!</p>
              ) : (
                <ul className="list-group">
                  {displayedTasks.map((task) => (
                    <li
                      key={task._id}
                      className={`list-group-item d-flex flex-column justify-content-between ${task.completed ? 'completed-task' : ''}`}
                    >
                      <div className="d-flex align-items-center mb-2">
                        <button
                          className="btn btn-sm btn-link text-warning me-2"
                          onClick={() => handleToggleFavourite(task)}
                        >
                          {task.favourite ? <FaStar /> : <FaRegStar />}
                        </button>
                        {editingTaskId === task._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                        ) : (
                          <span className="flex-grow-1">{task.task}</span>
                        )}
                      </div>
                      
                      {/* Display remainder date (with days left) */}
                      <div className="mb-2">
                        {editingTaskId === task._id ? (
                          <input
                            type="date"
                            className="form-control"
                            value={editingRemainderDate}
                            onChange={(e) => setEditingRemainderDate(e.target.value)}
                          />
                        ) : (
                          task.remainderDate && (
                            <small className="text-muted">
                              {(() => {
                                const daysLeft = getDaysLeft(task.remainderDate);
                                return daysLeft > 0 ? `${daysLeft} day(s) left` : 'Expired';
                              })()}
                            </small>
                          )
                        )}
                      </div>

                      {/* Actions */}
                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => handleToggleComplete(task)}
                        >
                          {task.completed ? <FaTimes /> : <FaCheck />}
                        </button>
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
                            onClick={() => handleEditTask(task)}
                          >
                            <FaEdit />
                          </button>
                        )}
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

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="pagination-container mt-3 d-flex justify-content-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`btn btn-sm me-2 ${page === currentPage ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
