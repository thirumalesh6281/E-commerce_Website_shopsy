import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adlogin.css'; // Make sure your CSS is in the right folder

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/backend/admin_login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Save admin details in localStorage
        localStorage.setItem('admin_name', data.name);
        localStorage.setItem('admin_email', data.email);
        navigate('/admin/dashboard');
      } else {
        setError('❌ Login failed: ' + (data.message || 'Invalid credentials.'));
      }
    } catch (err) {
      console.error('❌ Error during admin login:', err);
      setError('❌ Server error. Please try again later.');
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
