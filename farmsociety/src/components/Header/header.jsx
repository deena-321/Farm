// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
      <div className="logo">
          <p>ONLINE FARMKART</p> 
        </div>
        <ul className="nav-list">
          <li className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}>
            <Link to="/" onClick={() => handleTabClick('Home')}>Home</Link>
          </li>
          <li className={`nav-item ${activeTab === 'About' ? 'active' : ''}`}>
            <Link to="/catalogue" onClick={() => handleTabClick('About')}>Catalogue</Link>
          </li>
        
        </ul>
        <div className="signin">
          <Link to="/buy" className={`nav-item ${activeTab === 'Buy' ? 'active' : ''}`} onClick={() => handleTabClick('Buy')}>Buyers</Link>
          <Link to="/sell" className={`nav-item ${activeTab === 'Sell' ? 'active' : ''}`} onClick={() => handleTabClick('Sell')}>Sellers</Link>
          <Link to="/admin" className={`nav-item ${activeTab === 'Admin' ? 'active' : ''}`} onClick={() => handleTabClick('Admin')}>Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
