import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserCircle, FaHome, FaSignOutAlt, FaList, FaBars } from 'react-icons/fa';
import '../components/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false); // controls mobile offcanvas

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    toast.success('Logged out successfully!', { position: 'top-right' });
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button className="btn btn-primary d-md-none mb-3" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Desktop Sidebar (visible on md and up) */}
      <div className="sidebar bg-primary text-white d-none d-md-flex flex-column p-3">
        <div className="sidebar-header d-flex align-items-center mb-4">
          <FaUserCircle className="fs-2 me-2" />
          <div>
            <h5 className="m-0 fw-bold">
              {username ? `Hello, ${username}` : 'Not logged in'}
            </h5>
            <small className="text-white-50">User Panel</small>
          </div>
        </div>

        <nav className="nav flex-column mb-4">
          <Link to="/" className="nav-link text-white-50">
            <FaHome className="me-2" />
            Home
          </Link>
          <Link to="/tasks/history" className="nav-link text-white-50">
            <FaList className="me-2" />
            Task History
          </Link>
        </nav>

        <div className="mt-auto">
          <button
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Offcanvas Sidebar (visible on small devices when toggled) */}
      {isOpen && (
        <div className="offcanvas-sidebar d-md-none bg-primary text-white p-3">
          <div className="offcanvas-header d-flex justify-content-between align-items-center mb-4">
            <h5 className="m-0">Menu</h5>
            <button className="btn btn-outline-light" onClick={toggleSidebar}>
              &times;
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="sidebar-header d-flex align-items-center mb-4">
              <FaUserCircle className="fs-2 me-2" />
              <div>
                <h5 className="m-0 fw-bold">
                  {username ? `Hello, ${username}` : 'Not logged in'}
                </h5>
                <small className="text-white-50">User Panel</small>
              </div>
            </div>
            <nav className="nav flex-column mb-4">
              <Link to="/" className="nav-link text-white-50" onClick={toggleSidebar}>
                <FaHome className="me-2" />
                Home
              </Link>
              <Link to="/tasks/history" className="nav-link text-white-50" onClick={toggleSidebar}>
                <FaList className="me-2" />
                Task History
              </Link>
            </nav>
            <div className="mt-auto">
              <button
                className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
                onClick={() => {
                  toggleSidebar();
                  handleLogout();
                }}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
