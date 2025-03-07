import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        
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
          <ul className="navbar-nav ms-auto">
            {/* Example: Home link */}
            <li className="nav-item">
              <Link to="/" className="nav-link">
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
                {/* Optional icon */}
                <FaUserCircle className="me-1" />
                Account
              </span>
              {/* 
                dropdown-menu-end aligns dropdown to the right edge.
                Remove if you prefer left alignment.
              */}
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
