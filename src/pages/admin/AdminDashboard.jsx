import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '../styles/admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_email');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>🛠️ Admin Panel</h2>

        <button onClick={() => navigate('/admin/add-product')}>➕ Add Product</button>
        <button onClick={() => navigate('/admin/manage-products')}>🛠️ Manage Products</button>
        <button onClick={() => navigate('/admin/manage-orders')}>📑 Manage Orders</button>
        <button onClick={() => navigate('/admin/delivered-orders')}>✅ Delivered Orders</button>
        <button onClick={() => navigate('/admin/manage-users')}>👥 Manage Users</button>

        <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
      </div>

      {/* Content area (dynamic pages) */}
      <div className="admin-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminDashboard;
