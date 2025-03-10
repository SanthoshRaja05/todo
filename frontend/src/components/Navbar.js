import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css'; // Import the custom CSS for additional styles

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark navbar-custom sticky-top shadow">
      <div className="container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand fw-bold">
          ToDo List
        </Link>

        {/* Toggler/collapsible Button (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link text-uppercase fw-semibold">
                Home
              </Link>
            </li>
            {/* Account Dropdown */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle d-flex align-items-center"
                id="accountDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle className="me-1" size={20} />
                Account
              </span>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                <li>
                  <Link to="/register" className="dropdown-item">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="dropdown-item">
                    Login
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
