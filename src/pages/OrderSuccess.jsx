import React from 'react';
import { Link } from 'react-router-dom';
// import './styles/ordersuccess.css'; // create styles if needed

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <h2>🎉 Thank you for your order!</h2>
      <p>Your order has been placed successfully.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default OrderSuccess;
