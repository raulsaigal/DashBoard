import React from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css'; // Import a CSS file for custom styling

const Navbar = () => {
const navigate = useNavigate(); 

  const handleLogout = () => {
    // Implement logout logic here
    console.log('User logged out');
    navigate("/login"); 
  };

  return (
    <div className="navbar-container">
      {/* Logo or Brand Name */}
      <div className="navbar-logo"> DATAORBIT</div>

      {/* Navigation Menu */}
      <nav className="navbar-menu">
        <a href="/#overview" className="navbar-link">Overview</a>
        <a href="/analytics" className="navbar-link">Analytics</a>
        <a href="/settings" className="navbar-link">Settings</a>
      </nav>

      {/* Logout Button */}
      <button className="navbar-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;