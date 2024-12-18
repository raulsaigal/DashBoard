import React, { useState } from 'react';
import './Sidebar.css'; // CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <a href="#overview" className="sidebar-link">Overview</a>
        <a href="#analytics" className="sidebar-link">Analytics</a>
        <a href="#settings" className="sidebar-link">Settings</a>
        <a href="#logout" className="sidebar-link" onClick={() => console.log('User logged out')}>Logout</a>
      </div>
    </div>
  );
};

export default Sidebar;