// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../css/Profile.css'; // Import the custom CSS

function Profile() {
  const storedUsername = localStorage.getItem('username') || '';
  const [username, setUsername] = useState(storedUsername);
  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // GET /api/users/profile?username=oldUsername
        const { data } = await axios.get(
          `http://localhost:5000/api/users/profile?username=${storedUsername}`
        );
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        toast.error('Failed to load profile', { position: 'top-right' });
      }
    };

    if (storedUsername) {
      fetchProfile();
    }
  }, [storedUsername]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // PUT /api/users/profile
      const { data } = await axios.put('http://localhost:5000/api/users/profile', {
        username: storedUsername, // old username
        newUsername, // optional new username
        email,       // new or same email
        password,    // if provided, we want to update
      });

      // If the backend returns an updated username, update localStorage + state
      if (data.username && data.username !== storedUsername) {
        localStorage.setItem('username', data.username);
        setUsername(data.username);
      }

      toast.success('Profile updated!', { position: 'top-right' });

      // Clear the fields
      setPassword('');
      setNewUsername('');

      // Redirect to tasks page after success
      navigate('/tasks');
    } catch (error) {
      toast.error('Failed to update profile', { position: 'top-right' });
    }
  };

  return (
    <div className="profile-container d-flex justify-content-center align-items-center">
      <div className="card profile-card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-3 text-center">User Profile</h2>
          <form onSubmit={handleUpdate}>
            {/* Display current username & allow changing it */}
            <div className="mb-3">
              <label className="form-label fw-bold">Current Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">New Username (optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter new username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter new or same email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-bold">New Password (optional)</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <small className="text-muted">
                Leave blank if you don't want to change
              </small>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
