import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Fetch cart items from backend
  const fetchCart = () => {
    axios.get('http://localhost/backend/get_cart.php')
      .then(res => {
        if (res.data.success && Array.isArray(res.data.cart)) {
          const filtered = res.data.cart.filter(item => item.name && item.price && item.image);
          setCart(filtered);
        } else {
          setCart([]);
        }
      })
      .catch(err => {
        console.error("Cart fetch error:", err);
        setCart([]);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (product_id, newQty) => {
    axios.post('http://localhost/backend/update_quantity.php', {
      product_id: Number(product_id),
      quantity: Number(newQty)
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(fetchCart)
      .catch(err => console.error('Update quantity error:', err));
  };

  const inc = (product_id, currentQty) => {
    updateQuantity(product_id, Number(currentQty) + 1);
  };

  const dec = (product_id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(product_id, Number(currentQty) - 1);
    }
  };

  const removeFromCart = (product_id) => {
    axios.post('http://localhost/backend/remove_from_cart.php', {
      product_id: Number(product_id)
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(fetchCart)
      .catch(err => console.error('Remove item error:', err));
  };

  const total = cart.reduce((sum, item) =>
    sum + Number(item.price) * Number(item.quantity), 0
  );

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => {
                const qty = Number(item.quantity);
                const price = Number(item.price);
                return (
                  <tr key={item.product_id}>
                    <td>
                      <img className="cart-img" src={item.image} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{price.toFixed(2)}</td>
                    <td>
                      <button onClick={() => dec(item.product_id, qty)}>-</button>
                      <span className="qty">{qty}</span>
                      <button onClick={() => inc(item.product_id, qty)}>+</button>
                    </td>
                    <td>₹{(price * qty).toFixed(2)}</td>
                    <td>
                      <button className="btn-remove" onClick={() => removeFromCart(item.product_id)}>🗑</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Grand Total: ₹{total.toFixed(2)}</h3>
            {/* <button className="btn-buy">Buy Now</button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
