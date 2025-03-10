// src/pages/Settings.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../css/Settings.css'; // We'll define this file below

function Settings() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [showAvatars, setShowAvatars] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // On mount, read existing settings from localStorage
  useEffect(() => {
    const storedDark = localStorage.getItem('darkMode') === 'true';
    const storedAvatars = localStorage.getItem('showAvatars') === 'true';
    const storedRefresh = localStorage.getItem('autoRefresh') === 'true';

    setDarkMode(storedDark);
    setShowAvatars(storedAvatars);
    setAutoRefresh(storedRefresh);

    // Apply dark mode if stored
    applyDarkMode(storedDark);
  }, []);

  // Immediately apply or remove .dark-mode class from <body>
  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Handle toggling dark mode
  const handleDarkModeChange = (e) => {
    const isDark = e.target.checked;
    setDarkMode(isDark);
    applyDarkMode(isDark);
  };

  // Save current settings to localStorage
  const handleSave = () => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('showAvatars', showAvatars);
    localStorage.setItem('autoRefresh', autoRefresh);

    // Show a toast notification
    toast.success('Settings saved!', { position: 'top-right' });

    // Redirect to tasks page
    navigate('/tasks');
  };

  return (
    <div className="settings-container d-flex justify-content-center align-items-center">
      <div className="card settings-card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Settings</h2>

          {/* Dark Mode Toggle */}
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <label htmlFor="darkModeToggle" className="form-label fw-bold">
              Dark Mode
            </label>
            <input
              id="darkModeToggle"
              type="checkbox"
              className="form-check-input"
              checked={darkMode}
              onChange={handleDarkModeChange}
            />
          </div>

          {/* Show Avatars Toggle */}
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <label htmlFor="avatarsToggle" className="form-label fw-bold">
              Show Avatars
            </label>
            <input
              id="avatarsToggle"
              type="checkbox"
              className="form-check-input"
              checked={showAvatars}
              onChange={(e) => setShowAvatars(e.target.checked)}
            />
          </div>

          {/* Auto-Refresh Toggle */}
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <label htmlFor="autoRefreshToggle" className="form-label fw-bold">
              Auto-Refresh
            </label>
            <input
              id="autoRefreshToggle"
              type="checkbox"
              className="form-check-input"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
          </div>

          {/* Save Button */}
          <button className="btn btn-primary w-100" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
