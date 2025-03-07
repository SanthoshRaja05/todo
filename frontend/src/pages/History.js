import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../css/History.css'; // <-- Import your custom CSS file here

function History() {
  const [username] = useState(localStorage.getItem('username') || '');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!username) return;
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/tasks/history?username=${username}`
        );
        setHistory(data);
      } catch (error) {
        toast.error('Failed to fetch history.', { position: 'top-right' });
      }
    };
    fetchHistory();
  }, [username]);

  // Handler for going back to Tasks
  const handleBackToTasks = () => {
    navigate('/tasks');
  };

  return (
    <div className="history-container d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Task History</h2>

      {/* Back Button */}
      <div className="back-button-container mb-3">
        <button className="btn btn-secondary" onClick={handleBackToTasks}>
          Back to Tasks
        </button>
      </div>

      <div className="card history-card w-100" style={{ maxWidth: '800px' }}>
        <div className="card-body">
          {history.length === 0 ? (
            <p className="text-muted">No history found.</p>
          ) : (
            <ul className="list-group history-list">
              {history.map((entry) => (
                <li key={entry._id} className="list-group-item">
                  <strong>{entry.action.toUpperCase()}</strong>{' '}
                  {entry.action === 'create' && `new task "${entry.newTask}"`}
                  {entry.action === 'update' &&
                    `from "${entry.oldTask}" to "${entry.newTask}"`}
                  {entry.action === 'delete' && `removed "${entry.oldTask}"`}
                  {entry.action === 'clear' && `: all tasks cleared`}
                  <span className="text-muted float-end">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
