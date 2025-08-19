import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addproduct.css'

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('image', image); // upload file

    try {
      const res = await axios.post('http://localhost/backend/add_product.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        alert('Product added successfully!');
        setProduct({
          name: '',
          price: '',
          description: '',
          category: 'men'
        });
        setImage(null);
      } else {
        alert('Failed to upload product.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload product.');
    }
  };

  return (
    <div className="product-management-container">
  {/* Products Table (existing code) */}
  <div className="add-product-section">
    <div className="add-product-form-container">
      <h2 className="form-title">Add New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="product-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price (₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={product.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group file-upload-group">
            <label htmlFor="image">Product Image</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <span className="file-upload-label">
                {product.image ? product.image.name : 'Choose file...'}
              </span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="category" placeholder="Select Category">Category</label>
            <select 
              id="category"
              name="category" 
              value={product.category} 
              onChange={handleChange}
              className="category-select"
            >
              <option value="">Select category</option> 
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="electronics">Electronics</option>
              <option value="mobiles">Mobiles</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  </div>
</div>
  );
};

export default AddProduct;
