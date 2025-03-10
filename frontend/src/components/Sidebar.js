import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaList,
  FaBars,
  FaUser,
  FaCog
} from 'react-icons/fa';
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
      {/* Mobile toggle button (visible on small devices) */}
      <button className="btn btn-primary d-md-none mb-3 mobile-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Desktop Sidebar (visible on md and up) */}
      <div className="sidebar d-none d-md-flex flex-column">
        <div className="sidebar-header d-flex align-items-center p-3 mb-4 border-bottom">
          <FaUserCircle className="fs-2 me-2" />
          <div className="dropdown user-dropdown">
            <button
              className="btn btn-link text-white dropdown-toggle m-0 p-0 sidebar-user"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {username ? `Hello, ${username}` : 'Not logged in'}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        <nav className="nav flex-column px-3">
          <Link to="/tasks/history" className="nav-link sidebar-link">
            <FaList className="me-2" />
            Task History
          </Link>
          <Link to="/profile" className="nav-link sidebar-link">
            <FaUser className="me-2" />
            Profile
          </Link>
          <Link to="/settings" className="nav-link sidebar-link">
            <FaCog className="me-2" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Mobile Offcanvas Sidebar (visible on small devices when toggled) */}
      {isOpen && (
        <div className="offcanvas-sidebar d-md-none">
          <div className="offcanvas-header d-flex justify-content-between align-items-center p-3 border-bottom">
            <h5 className="m-0 text-white">Menu</h5>
            <button className="btn btn-outline-light" onClick={toggleSidebar}>
              &times;
            </button>
          </div>
          <div className="offcanvas-body px-3">
            <div className="d-flex align-items-center mb-4 text-white">
              <FaUserCircle className="fs-2 me-2" />
              <div className="dropdown user-dropdown">
                <button
                  className="btn btn-link text-white dropdown-toggle m-0 p-0 sidebar-user"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {username ? `Hello, ${username}` : 'Not logged in'}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        toggleSidebar();
                        handleLogout();
                      }}
                    >
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <nav className="nav flex-column">
              <Link
                to="/tasks/history"
                className="nav-link sidebar-link"
                onClick={toggleSidebar}
              >
                <FaList className="me-2" />
                Task History
              </Link>
              <Link
                to="/profile"
                className="nav-link sidebar-link"
                onClick={toggleSidebar}
              >
                <FaUser className="me-2" />
                Profile
              </Link>
              <Link
                to="/settings"
                className="nav-link sidebar-link"
                onClick={toggleSidebar}
              >
                <FaCog className="me-2" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
