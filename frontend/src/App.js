import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import History from './pages/History';
import Profile from './pages/Profile';
import Settings from "./pages/Settings";
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      {/* ToastContainer for global toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Home route includes the navbar + home content */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* Register and Login routes without the navbar */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Tasks route - includes its own Sidebar within <Tasks /> */}
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/history" element={<History />} />

        {/* OPTIONAL: If you create a Profile page */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
