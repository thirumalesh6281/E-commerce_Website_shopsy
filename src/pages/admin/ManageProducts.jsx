import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/manageProduct.css';
import { useNavigate } from 'react-router-dom';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = () => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios
        .post('http://localhost/backend/delete_product.php', { id })
        .then((res) => {
          if (res.data.success) {
            alert('✅ Product deleted successfully!');
            fetchProducts(); // Refresh product list
          } else {
            alert('❌ Failed to delete product');
          }
        })
        .catch((err) => {
          console.error('Error deleting product:', err);
        });
    }
  };

  // Edit product (navigate to edit form with id as param)
  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  return (
    <div className="products-dashboard">
  <h2 className="dashboard-title">🛒 Manage Products</h2>
  {products.length === 0 ? (
    <div className="no-products-message">
      <p>No products found.</p>
    </div>
  ) : (
    <div className="fullscreen-table-container">
      <table className="products-table-fullscreen">
        <thead className="table-header">
          <tr>
            <th className="id-col">ID</th>
            <th className="image-col">Image</th>
            <th className="name-col">Name</th>
            <th className="price-col">Price</th>
            <th className="category-col">Category</th>
            <th className="desc-col">Description</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="product-data-row">
              <td className="id-cell">{product.id}</td>
              <td className="image-cell">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image" 
                />
              </td>
              <td className="name-cell">{product.name}</td>
              <td className="price-cell" style={{color: '#28a745', fontWeight: '600'}}>
                ₹{product.price}
              </td>
              <td className="category-cell">{product.category}</td>
              <td className="desc-cell">{product.description}</td>
              <td className="actions-cell">
                {/* <button 
                  onClick={() => handleEdit(product.id)} 
                  className="action-btn edit-btn"
                >
                  Edit
                </button> */}
                <button 
                  onClick={() => handleDelete(product.id)} 
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
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

export default ManageProduct;
