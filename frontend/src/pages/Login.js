import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Make an API call to your backend (adjust the URL if needed)
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Save the returned username in localStorage
      // (Ensure your backend returns { username: user.username } in the response)
      localStorage.setItem('username', data.username);

      toast.success('Login successful! Redirecting...', { position: 'top-right' });

      // Redirect to /tasks after a brief delay
      setTimeout(() => {
        navigate('/tasks');
      }, 1500);

    } catch (error) {
      // Handle errors with a toast
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, { position: 'top-right' });
      } else {
        toast.error('Login failed. Please try again.', { position: 'top-right' });
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="login-form mx-auto">
        
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
