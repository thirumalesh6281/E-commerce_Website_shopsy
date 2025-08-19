import React, { useState } from 'react';
import axios from 'axios';
import './styles/login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 📌 Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📌 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost/backend/login.php", form);
      const data = res.data;

      if (data.status === "success") {
        // ✅ Save to localStorage
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.name);
        localStorage.setItem("user_email", data.email);

        // ✅ Navigate to profile page
        navigate("/");
      } else {
        setError("❌ " + (data.message || "Login failed"));
      }
    } catch (err) {
      console.error("Network or server error:", err);
      setError("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        <p className="toggle-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
