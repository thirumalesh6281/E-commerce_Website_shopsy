import React, { useState, useEffect } from 'react';
import './styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const placeholders = [
    "Search products...",
    "Search TVs...",
    "Search Menswear...",
    "Search Women Wears...",
    "Search Mobiles...",
    "Search Laptops..."
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost/backend/logout.php');

      localStorage.clear(); // ✅ Clear all login details
      navigate('/login');   // ✅ Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src="/logo.jpg" alt="Logo" className="logo-image" />
          <h1 className="logo-text">Shopsy</h1>
        </Link>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder={placeholders[placeholderIndex]}
          className="search-input animated-placeholder"
        />
      </div>

      <div className="navbar-right">
        <Link to="/cart">
        <button className="nav-btn">🛒 Cart</button>
        </Link>
        <Link to="/profile">
          <button className="nav-btn">👤 Profile</button>
        </Link>
        <button className="nav-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
