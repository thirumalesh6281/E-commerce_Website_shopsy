import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/adminviewproduct.css'

const AdminViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost/backend/get_all_products.php')
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setProducts([]);
      });
  }, []);

  return (
    <div className="admin-view-products">
      <h2>🛍️ All Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name} width="150" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
              <p>Category: <strong>{product.category}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminViewProduct;
