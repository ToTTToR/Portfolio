// Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#f4f4f4', // light gray background
    color: '#333', // dark text color
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    zIndex: 1000, // ensure the button is not behind other elements
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(!isOpen)} style={buttonStyle}>
        {isOpen ? 'Close' : 'Open'} Sidebar
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <p>This is the sidebar content.</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;