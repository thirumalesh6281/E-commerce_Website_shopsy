import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../catstyles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/backend/manage_users.php")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  return (
    <div className="manage-users">
      <h2>👥 Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
