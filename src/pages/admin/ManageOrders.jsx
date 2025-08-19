// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../catstyles/manageOrders.css';

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = () => {
//     axios.get("http://localhost/backend/get_orders.php")
//       .then(res => {
//         if (res.data.success) {
//           setOrders(res.data.orders);
//         } else {
//           console.error("Failed to load orders");
//         }
//       })
//       .catch(err => {
//         console.error("Network error:", err);
//       });
//   };

//   const handleDelete = (orderId) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;

//     axios.post(
//       "http://localhost/backend/delete_order.php",
//       JSON.stringify({ order_id: orderId }), // ✅ Send as raw JSON
//       { headers: { 'Content-Type': 'application/json' } } // ✅ Required
//     )
//     .then(res => {
//       if (res.data.success) {
//         alert("✅ Order deleted successfully");
//         fetchOrders(); // refresh list
//       } else {
//         alert("❌ Failed to delete order: " + (res.data.message || "Unknown error"));
//       }
//     })
//     .catch(err => {
//       console.error("Network error:", err);
//       alert("❌ Network or server error");
//     });
//   };

//   return (
//     <div className="orders-container">
//       <h2>📦 Manage Orders</h2>

//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         orders.map(order => (
//           <div key={order.order_id} className="order-card">
//             <div className="order-header">
//               <h4>Order #{order.order_id}</h4>
//               <button className="delete-btn" onClick={() => handleDelete(order.order_id)}>
//                 ❌ Delete
//               </button>
//             </div>

//             <div className="order-items">
//               {order.items.map((item, index) => (
//                 <div key={index} className="order-item">
//                   <img src={item.image} alt={item.name} />
//                   <div className="item-details">
//                     <p><strong>{item.name}</strong></p>
//                     <p>Price: ₹{item.price}</p>
//                     <p>Qty: {item.quantity}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="order-meta">
//               <p><strong>📮 Address:</strong> {order.address}</p>
//               <p><strong>💵 Payment:</strong> {order.payment}</p>
//               <p><strong>🧾 Total:</strong> ₹{order.total}</p>
//               <p><strong>⏱ Time:</strong> {order.time}</p>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ManageOrders;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import '../catstyles/manageOrders.css';

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [shippedItems, setShippedItems] = useState([]);
//   const [deliveredItems, setDeliveredItems] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost/backend/get_orders.php")
//       .then((res) => {
//         if (res.data.success) {
//           setOrders(res.data.orders);
//         }
//       })
//       .catch(() => {
//         alert("❌ Failed to fetch orders.");
//       });
//   }, []);

//   const markShipped = async (orderId, itemName) => {
//     try {
//       const res = await axios.post("http://localhost/backend/mark_shipped.php", {
//         order_id: orderId,
//         item_name: itemName
//       });

//       if (res.data.success) {
//         setOrders(prevOrders =>
//           prevOrders.map(order => {
//             if (order.id !== orderId) return order;

//             const remainingItems = order.items.filter(item => item.name !== itemName);
//             const shippedItem = order.items.find(item => item.name === itemName);

//             if (shippedItem) {
//               setShippedItems(prev => [...prev, { ...shippedItem, orderId }]);
//             }

//             return { ...order, items: remainingItems };
//           }).filter(order => order.items.length > 0)
//         );
//       } else {
//         alert("❌ Failed to mark as shipped.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error updating shipped status.");
//     }
//   };

//   const markDelivered = async (orderId, itemName) => {
//     try {
//       const res = await axios.post("http://localhost/backend/mark_delivered.php", {
//         order_id: orderId,
//         item_name: itemName
//       });

//       if (res.data.success) {
//         setShippedItems(prevItems => {
//           const remaining = prevItems.filter(item => !(item.orderId === orderId && item.name === itemName));
//           const deliveredItem = prevItems.find(item => item.orderId === orderId && item.name === itemName);
//           if (deliveredItem) {
//             setDeliveredItems(prev => [...prev, deliveredItem]);
//           }
//           return remaining;
//         });
//       } else {
//         alert("❌ Failed to mark as delivered.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error updating delivery status.");
//     }
//   };

//   return (
//     <div className="orders-dashboard">
//       <h2 className="dashboard-title">📦 Manage Orders</h2>

//       {/* Pending Orders */}
//       {orders.length === 0 ? (
//         <div className="no-orders-message">
//           <p>No orders found.</p>
//         </div>
//       ) : (
//         <div className="fullscreen-table-container">
//           <h3>🕓 Pending Orders</h3>
//           <table className="orders-table-fullscreen">
//             <thead className="table-header">
//               <tr>
//                 <th>Order ID</th>
//                 <th>Items</th>
//                 <th>Address</th>
//                 <th>Payment</th>
//                 <th>Total</th>
//                 <th>Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map(order => (
//                 <tr key={order.id}>
//                   <td>#{order.id}</td>
//                   <td>
//                     {order.items.map((item, index) => (
//                       <div key={index} className="item-row-fullwidth">
//                         <img src={item.image} alt={item.name} className="item-image-large" />
//                         <div className="item-details">
//                           <span className="item-name-large">{item.name}</span>
//                           <span className="item-price-large">₹{item.price} × {item.quantity}</span>
//                           <button className="btn-shipped" onClick={() => markShipped(order.id, item.name)}>🚚 Shipped</button>
//                         </div>
//                       </div>
//                     ))}
//                   </td>
//                   <td>{order.address}</td>
//                   <td>{order.payment_method}</td>
//                   <td>₹{order.total}</td>
//                   <td>{order.time}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Shipped Products */}
//       {shippedItems.length > 0 && (
//         <div className="shipped-section">
//           <h2>🚚 Shipped Products</h2>
//           <table className="orders-table-fullscreen">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Product</th>
//                 <th>Quantity</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {shippedItems.map((item, idx) => (
//                 <tr key={idx} style={{ backgroundColor: '#cce5ff' }}>
//                   <td>#{item.orderId}</td>
//                   <td>{item.name}</td>
//                   <td>{item.quantity}</td>
//                   <td>
//                     <button className="btn-delivered" onClick={() => markDelivered(item.orderId, item.name)}>
//                       ✅ Delivered
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Delivered Products */}
//       {deliveredItems.length > 0 && (
//         <div className="delivered-section">
//           <h2>✅ Delivered Products</h2>
//           <table className="orders-table-fullscreen">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Product</th>
//                 <th>Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {deliveredItems.map((item, idx) => (
//                 <tr key={idx} style={{ backgroundColor: '#d4edda' }}>
//                   <td>#{item.orderId}</td>
//                   <td>{item.name}</td>
//                   <td>{item.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageOrders;








// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [deliveredItems, setDeliveredItems] = useState([]);

//   useEffect(() => {
//     // Fetch all orders
//     axios
//       .get("http://localhost/backend/get_orders.php")
//       .then((res) => {
//         if (res.data.success) {
//           setOrders(res.data.orders);
//         }
//       })
//       .catch((err) => console.error("Failed to fetch orders", err));

//     // Fetch delivered items
//     axios
//       .get("http://localhost/backend/get_delivered.php")
//       .then((res) => {
//         if (res.data.success) {
//           setDeliveredItems(res.data.delivered); // array of "order_id_itemName"
//         }
//       })
//       .catch((err) => console.error("Failed to fetch delivered items", err));
//   }, []);

//   const markAsDelivered = (order, item) => {
//     const payload = {
//       order_id: order.order_id,
//       user_name: order.user_name,
//       address: order.address,
//       payment_method: order.payment_method,
//       total: order.total,
//       time: order.time,
//       items: [
//         {
//           name: item.name,
//           price: item.price,
//           image: item.image,
//           quantity: item.quantity,
//         },
//       ],
//     };

//     axios
//       .post("http://localhost/backend/mark_delivered.php", payload)
//       .then((res) => {
//         if (res.data.success) {
//           // Update the state to reflect delivery
//           setDeliveredItems((prev) => [
//             ...prev,
//             `${order.order_id}_${item.name}`,
//           ]);
//         } else {
//           console.error("Delivery failed", res.data.message);
//         }
//       })
//       .catch((err) => console.error("Something went wrong", err));
//   };

//   return (
//     <div>
//       <h2>🧾 Manage Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         orders.map((order, index) => (
//           <div key={index} style={{ border: "1px solid gray", marginBottom: "20px", padding: "10px" }}>
//             <p><strong>User:</strong> {order.user_name}</p>
//             <p><strong>Address:</strong> {order.address}</p>
//             <p><strong>Payment:</strong> {order.payment_method}</p>
//             <p><strong>Total:</strong> ₹{order.total}</p>
//             <p><strong>Time:</strong> {order.time}</p>
//             <div>
//               <strong>Items:</strong>
//               {order.items.map((item, idx) => {
//                 const isDelivered = deliveredItems.includes(
//                   `${order.order_id}_${item.name}`
//                 );
//                 return (
//                   <div key={idx} style={{ borderTop: "1px dashed #ccc", marginTop: "10px", paddingTop: "10px" }}>
//                     <img src={item.image} alt={item.name} width="100" />
//                     <p>Name: {item.name}</p>
//                     <p>Price: ₹{item.price}</p>
//                     <p>Qty: {item.quantity}</p>

//                     {!isDelivered ? (
//                       <button
//                         onClick={() => markAsDelivered(order, item)}
//                         style={{
//                           backgroundColor: "green",
//                           color: "white",
//                           padding: "5px 10px",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           marginTop: "5px",
//                         }}
//                       >
//                         Mark as Delivered
//                       </button>
//                     ) : (
//                       <p style={{ color: "green", fontWeight: "bold" }}>✅ Delivered</p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ManageOrders;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../catstyles/manageOrders.css';

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [delivered, setDelivered] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//     fetchDelivered();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get('http://localhost/backend/get_orders.php');
//       setOrders(res.data.orders || []);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const fetchDelivered = async () => {
//     try {
//       const res = await axios.get('http://localhost/backend/get_delivered.php');
//       setDelivered(res.data.delivered || []);
//     } catch (error) {
//       console.error("Error fetching delivered orders:", error);
//     }
//   };

//   const markDelivered = async (item) => {
//     try {
//       await axios.post("http://localhost/backend/mark_delivered.php", {
//         item: {
//           order_id: item.order_id,
//           user_name: item.user_name,
//           name: item.name,
//           price: item.price,
//           image: item.image,
//           quantity: item.quantity,
//           address: item.address,
//           payment_method: item.payment_method,
//           total: item.total,
//           time: new Date().toISOString().slice(0, 19).replace("T", " ")
//         }
//       });

//       // Remove delivered item from orders and refresh
//       setOrders(prev => prev.filter(i => i.id !== item.id));
//       fetchDelivered();
//     } catch (err) {
//       console.error("Failed to mark as delivered", err);
//       alert("Failed to mark as delivered");
//     }
//   };

//   const isDelivered = (order_id, product_name) => {
//     return delivered.some(d => d.order_id === order_id && d.name === product_name);
//   };

//   return (
//     <div className="product-section">
//       <h2>🧾 Manage Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found</p>
//       ) : (
//         orders.map((order, index) => (
//           <div key={index} className="product-card">
//             <img src={order.image} alt={order.name} style={{ width: '100px' }} />
//             <h3>{order.name}</h3>
//             <p>👤 User: {order.user_name}</p>
//             <p>📦 Quantity: {order.quantity}</p>
//             <p>💰 Price: ₹{order.price}</p>
//             <p>📍 Address: {order.address}</p>
//             <p>💳 Payment: {order.payment_method}</p>
//             <p>🧾 Total: ₹{order.total}</p>
//             {!isDelivered(order.order_id, order.name) && (
//               <button onClick={() => markDelivered(order)} className="btn btn-success">
//                 ✅ Mark as Delivered
//               </button>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ManageOrders;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../catstyles/manageOrders.css';

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = () => {
//     axios.get('http://localhost/backend/get_orders.php')
//       .then((res) => {
//         if (res.data.success) {
//           setOrders(res.data.orders);
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching orders:', err);
//       });
//   };


// const markAsDelivered = (orderItem) => {
//   const payload = {
//     order_id: orderItem.order_id,
//     user_name: orderItem.user_name,
//     address: orderItem.address,
//     payment_method: orderItem.payment_method,
//     total: orderItem.total,
//     time: new Date().toISOString().slice(0, 19).replace('T', ' '),
//     items: [
//       {
//         name: orderItem.name,
//         price: orderItem.price,
//         image: orderItem.image,
//         quantity: orderItem.quantity
//       }
//     ]
//   };

//   axios
//     .post("http://localhost/backend/mark_delivered.php", JSON.stringify(payload), {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     .then((res) => {
//       alert(res.data.message);
//     })
//     .catch((err) => {
//       console.error("Axios Error:", err);
//       alert("❌ Network or server error");
//     });
// };



//   return (
//     <div className="manage-orders">
//       <h2>Manage Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders available.</p>
//       ) : (
//         orders.map((order, index) => (
//           <div key={index} className="order-card">
//             <h4>User: {order.user_name}</h4>
//             <p>Address: {order.address}</p>
//             <p>Payment: {order.payment_method}</p>
//             <p>Total: ₹{order.total}</p>
//             <p>Time: {order.time}</p>

//             {order.items.map((item, idx) => (
//               <div key={idx} className="order-item">
//                 <img src={item.image} alt={item.name} className="order-img" />
//                 <div>
//                   <p><strong>{item.name}</strong></p>
//                   <p>Price: ₹{item.price}</p>
//                   <p>Qty: {item.quantity}</p>
//                 </div>
//                 <button
//                   className="deliver-button"
//                   onClick={() =>
//                     markAsDelivered({
//                       order_id: order.order_id,
//                       user_name: order.user_name,
//                       name: item.name,
//                       price: item.price,
//                       image: item.image,
//                       quantity: item.quantity,
//                       address: order.address,
//                       payment_method: order.payment_method,
//                       total: order.total,
//                       time: order.time
//                     })
//                   }
//                 >
//                   ✅ Mark as Delivered
//                 </button>
//               </div>
//             ))}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ManageOrders;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../catstyles/manageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost/backend/get_orders.php');

      if (response.data.success) {
        // Group by order ID
        const groupedOrders = response.data.orders.reduce((acc, current) => {
          const existingOrder = acc.find(order => order.id === current.id);

          if (existingOrder) {
            existingOrder.items.push({
              name: current.name,
              price: current.price,
              image: current.image,
              status: current.status
            });
          } else {
            acc.push({
              id: current.id,
              address: current.address,
              payment: current.payment,
              total: current.total,
              time: current.time,
              items: [
                {
                  name: current.name,
                  price: current.price,
                  image: current.image,
                  status: current.status
                }
              ]
            });
          }
          return acc;
        }, []);

        setOrders(groupedOrders); // ✅ show all orders
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark as Delivered (with axios.post)
  const markAsDelivered = async (orderId, itemName) => {
  if (!window.confirm(`Mark "${itemName}" from Order #${orderId} as delivered?`)) {
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost/backend/mark_delivered.php",
      JSON.stringify({ order_id: orderId, item_name: itemName }), // ✅ send JSON string
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Server Response:", response.data); // Debug

    if (response.data.success) {
      alert(response.data.message);
      fetchOrders();
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Error marking as delivered:", error);
    alert("Failed to mark as delivered");
  }
};


  if (loading) {
    return (
      <div className="orders-dashboard1">
        <h2 className="dashboard-title1">📦 Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="orders-dashboard1">
      <h2 className="dashboard-title1">📦 Manage Orders ({orders.length})</h2>

      {orders.length === 0 ? (
        <div className="no-orders1">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-table-container1">
          <table className="orders-table1">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Address</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Order Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td className="order-items-cell1">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="item-image1"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                          }}
                        />
                        <div className="item-details1">
                          <p className="item-name1">{item.name}</p>
                          <p className="item-price1">₹{item.price}</p>
                          <span
                            className={`item-status-badge ${
                              item.status === 'pending' ? 'pending' : 'delivered'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>{order.address}</td>
                  <td>{order.payment || "N/A"}</td>
                  <td className="total-cell1">₹{order.total}</td>
                  <td>{new Date(order.time).toLocaleString()}</td>
                  <td className="actions-cell1">
                    {order.items
                      .filter(item => item.status === 'pending')
                      .map((item, index) => (
                        <button
                          key={index}
                          className="deliver-btn1"
                          onClick={() => markAsDelivered(order.id, item.name)}
                        >
                          Mark Delivered
                        </button>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
