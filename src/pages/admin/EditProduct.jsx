import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/editProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    // Fetch product details by ID
    axios
      .get(`http://localhost/backend/get_product_by_id.php?id=${id}`)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          alert('Product not found');
        }
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost/backend/update_product.php', { ...product, id })
      .then((res) => {
        if (res.data.success) {
          alert('✅ Product updated successfully!');
          navigate('/admin/manage-products');
        } else {
          alert('❌ Failed to update product');
        }
      })
      .catch((err) => {
        console.error('Error updating product:', err);
      });
  };

  return (
    <div className="edit-product-container">
      <h2>✏️ Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <label>Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange} required />

        <label>Category:</label>
        <select name="category" value={product.category} onChange={handleChange}>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="electronics">Electronics</option>
          <option value="mobiles">Mobiles</option>
        </select>

        <label>Image URL:</label>
        <input type="text" name="image" value={product.image} onChange={handleChange} required />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
