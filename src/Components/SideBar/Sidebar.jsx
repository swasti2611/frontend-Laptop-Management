import React, { useState, useEffect } from 'react';
import "./../../Style/Sidebar.css";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Used for redirection

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    // window.location.href = "/login"; // Redirect to login page
    navigate("/login")
    
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setIsAdmin(true); // Set admin access if the role is admin
    }
  }, []);

  // Handle admin link click
  const handleAdminClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
      navigate("/adminlogin"); // Redirect to admin login page if not logged in or not an admin
    
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3 className="brand">
          <i className="fas fa-anchor"></i>
          <span>Laptop Management</span>
        </h3>
        <div className="toggle-btn" onClick={toggleSidebar}>
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} toggle-icon`}></i>
        </div>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#" className="nav-item">
            <span className="nav-icon"><i className="fas fa-home"></i></span>
            <Link to="/">Home</Link>
          </a>
        </li>
        <li>
          {/* <a href="#" className="nav-item">
            <span className="nav-icon"><i className="fas fa-user"></i></span>
            <span>Profile</span>
          </a> */}
        </li>
        {/* Admin link */}
        <li>
          <a href="#" className="nav-item" onClick={handleAdminClick}>
            <span className="nav-icon"><i className="fa-solid fa-chart-line"></i></span>
            <span>Admin</span>
          </a>
        </li>
        {/* <li>
          <a href="#" className="nav-item">
            <span className="nav-icon"><i className="fa-solid fa-right-to-bracket"></i></span>
            <Link to="/signup">SignUp</Link>
          </a>
        </li> */}
        <li>
          {/* <a href="#" className="nav-item">
            <span className="nav-icon"><i className="fa-solid fa-right-to-bracket"></i></span>
            <Link to="/login">Login</Link>
          </a> */}

          <a href="#" className="nav-item" onClick={handleLogout}>
            <span className="nav-icon"><i className="fa-solid fa-right-to-bracket"></i></span>
            Logout
          </a>
        </li>
        <li className={`dropdown ${activeDropdown === 0 ? 'active' : ''}`}>
          <a href="#" className="nav-item dropdown-toggle" onClick={() => toggleDropdown(0)}>
            <div>
              <span className="nav-icon"><i className="fas fa-cogs"></i></span>
              <span>Settings</span>
            </div>
            <i className={`fas ${activeDropdown === 0 ? 'fa-chevron-down' : 'fa-chevron-right'} dropdown-icon`}></i>
          </a>
          <ul className="dropdown-menu">
            <li><a href="#" className="dropdown-item">General</a></li>
            <li><a href="#" className="dropdown-item">Privacy</a></li>
            <li><a href="#" className="dropdown-item">Notifications</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
