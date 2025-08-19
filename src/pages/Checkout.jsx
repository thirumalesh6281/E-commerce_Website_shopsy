// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './styles/checkout.css';

// const Checkout = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [address, setAddress] = useState('');
//   const [payment, setPayment] = useState('cod');
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost/backend/get_checkout_data.php')
//       .then(res => {
//         if (res.data.success) {
//           setCartItems(res.data.cart);
//           calculateTotal(res.data.cart);
//         }
//       }).catch(err => {
//         console.error('Error fetching cart:', err);
//       });
//   }, []);

//   const calculateTotal = (items) => {
//     const itemTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const deliveryCharge = items.length * 30;
//     setTotal(itemTotal + deliveryCharge);
//   };

//   const handleOrder = () => {
//     if (!address) {
//       alert("Please enter your address");
//       return;
//     }

//     axios.post('http://localhost/backend/place_order.php', {
//       address,
//       payment,
//       cart: cartItems,
//       total
//     }, {
//       headers: { "Content-Type": "application/json" }
//     }).then(res => {
//       if (res.data.success) {
//         alert("✅ Order placed successfully!");
//         setCartItems([]);
//         setAddress('');
//         setPayment('cod');
//         setTotal(0);
//       } else {
//         alert("❌ Failed to place order");
//       }
//     }).catch(err => {
//       console.error("Place order error:", err);
//       alert("❌ Error placing order");
//     });
//   };

//   return (
//     <div className="checkout-container">
//       <h2>🛒 Checkout</h2>

//       <div className="checkout-items">
//         {cartItems.length === 0 ? (
//           <p>No items in cart</p>
//         ) : (
//           cartItems.map((item, index) => (
//             <div key={index} className="checkout-product">
//               <img src={item.image} alt={item.name} />
//               <div>
//                 <h4>{item.name}</h4>
//                 <p>Price: ₹{item.price}</p>
//                 <p>Quantity: {item.quantity}</p>
//                 <p>Subtotal: ₹{item.price * item.quantity}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {cartItems.length > 0 && (
//         <div className="checkout-form">
//           <textarea
//             placeholder="Enter your delivery address"
//             value={address}
//             onChange={e => setAddress(e.target.value)}
//           ></textarea>

//           <div className="payment-options">
//             <label>
//               <input
//                 type="radio"
//                 name="payment"
//                 value="cod"
//                 checked={payment === 'cod'}
//                 onChange={e => setPayment(e.target.value)}
//               />
//               Cash on Delivery
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="payment"
//                 value="phonepe"
//                 checked={payment === 'phonepe'}
//                 onChange={e => setPayment(e.target.value)}
//               />
//               PhonePe UPI
//             </label>
//           </div>

//           <div className="total">Total: ₹{total}</div>

//           <button className="order-btn" onClick={handleOrder}>
//             🛒 Order Now
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout; 




import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('Cash on Delivery');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (location.state?.singleProduct) {
      const product = location.state.singleProduct;
      const productWithQty = { ...product, quantity: 1 };
      setCartItems([productWithQty]);
    } else {
      fetchCart();
    }
  }, [location.state]);

  const fetchCart = () => {
    axios.get('http://localhost/backend/get_cart.php')
      .then(res => {
        if (res.data.success) {
          setCartItems(res.data.cart);
        }
      })
      .catch(err => {
        console.error("❌ Error fetching cart:", err);
      });
  };

  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      const itemTotal = (item.price || 0) * (item.quantity || 1) + 30; // ₹30 delivery charge
      totalPrice += itemTotal;
    });
    setTotal(totalPrice);
  }, [cartItems]);

  const placeOrder = () => {
    if (!address.trim()) {
      alert("❌ Please enter your address.");
      return;
    }

    const orderData = {
      address,
      payment,
      total,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity || 1
      }))
    };

    console.log("Sending order:", orderData);

    axios.post('http://localhost/backend/place_order.php', orderData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.data.success) {
          alert("✅ Order placed successfully!");
          navigate('/');
        } else {
          alert("❌ Failed to place order: " + res.data.message);
        }
      })
      .catch(err => {
        console.error("❌ Order error:", err);
        alert("❌ Network or server error.");
      });
  };

  return (
    <div className="checkout-container">
      <h2>🧾 Checkout</h2>
      {cartItems.length === 0 ? (
        <p>No products to checkout.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="checkout-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Delivery Charges : ₹30</p>
              <p>Quantity: {item.quantity || 1}</p>
              <p>Subtotal: ₹{(item.price || 0) * (item.quantity || 1) + 30}</p>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <>
          <textarea
            placeholder="Enter your delivery address Like:
                         H.NO: 
                         coloy:
                         village: 
                         Dist: 
                         state:"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="Cash on Delivery"
                checked={payment === 'Cash on Delivery'}
                onChange={(e) => setPayment(e.target.value)}
              />
              Cash on Delivery
            </label>
            {/* <label>
              <input
                type="radio"
                value="PhonePe UPI"
                checked={payment === 'PhonePe UPI'}
                onChange={(e) => setPayment(e.target.value)}
              />
              PhonePe UPI
            </label> */}
          </div>

          <h3>Total: ₹{total}</h3>
          <button onClick={placeOrder}>📦 Order</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
