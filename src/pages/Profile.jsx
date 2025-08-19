import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/profile.css'; // Optional styling

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_email');

    if (!name || !email) {
      alert("⚠️ Please login first.");
      navigate('/login');
    } else {
      setUser({ name, email });
    }
  }, [navigate]);

  return (
    <div className="profile-container">
    <div className="profile-card">
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  </div>
  );
};

export default Profile;
