import React, { useState } from 'react';
import axios from 'axios';
import './styles/register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost/backend/register.php", form);
      alert("✅ Registered successfully!");
      setForm({ name: '', email: '', password: '' });
      setError('');
    } catch (err) {
      console.error(err);
      setError('❌ Network error! Please try again later.');
    }
  };

  return (
    <div className="auth-container">
  <div className="auth-overlay"></div>
  <div className="auth-content">
    <h2>Create an Account</h2>
    <form onSubmit={handleSubmit} className="auth-form">
      <input 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        placeholder="Full Name" 
        required 
        className="auth-input"
      />
      <input 
        name="email" 
        type="email" 
        value={form.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
        className="auth-input"
      />
      <input 
        name="password" 
        type="password" 
        value={form.password} 
        onChange={handleChange} 
        placeholder="Password" 
        required 
        className="auth-input"
      />
      <button type="submit" className="auth-button">Register</button>
      {error && <p className="auth-error">{error}</p>}
      <p className="auth-text">
        Already have an account? <Link to="/login" className="auth-link">Login</Link>
      </p>
    </form>
  </div>
</div>
  );
};

export default Register;
