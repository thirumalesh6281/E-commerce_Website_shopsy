import React, { useEffect, useState } from 'react';
import '../styles/deliveryprod.css'
import axios from 'axios';

const DeliveredOrders = () => {
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/backend/get_delivered.php')
      .then((res) => {
        console.log('Delivered Orders:', res.data);
        if (res.data.success && Array.isArray(res.data.delivered)) {
          setDelivered(res.data.delivered);
        } else {
          setDelivered([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching delivered orders:", err);
        setDelivered([]);
      });
  }, []);

  return (
    <div className="delivered-orders">
  <h2>📦 Delivered Orders</h2>

  {delivered.length === 0 ? (
    <p className="empty">No delivered orders yet.</p>
  ) : (
    <table className="delivered-table">
      <thead>
        <tr>
          <th>👤 Name</th>
          <th>📦 Product</th>
          <th>🖼 Image</th>
          <th>💰 Price</th>
          <th>🔢 Quantity</th>
          <th>📍 Address</th>
          <th>💳 Payment</th>
          <th>🧾 Total</th>
          <th>🕒 Time</th>
        </tr>
      </thead>
      <tbody>
        {delivered.map((item, index) => (
          <tr key={item.id}>
            <td>{item.user_name || 'Unknown User'}</td>
            <td>{item.name}</td>
            <td>
              <img src={item.image} alt={item.name} />
            </td>
            <td>₹{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.address}</td>
            <td>{item.payment_method || 'N/A'}</td>
            <td>₹{item.total}</td>
            <td>{item.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>


  );
};

export default DeliveredOrders;
