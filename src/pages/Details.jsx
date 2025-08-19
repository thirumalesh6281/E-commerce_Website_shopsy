import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/details.css';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost/backend/get_product_by_id.php?id=${id}`)
      .then(res => {
        if (res.data.success && res.data.product) {
          setProduct(res.data.product);
          fetchRelatedProducts(res.data.product.category);
        }
      });
  }, [id]);

  const fetchRelatedProducts = (category) => {
    axios.get(`http://localhost/backend/get_products.php?category=${category}`)
      .then(res => {
        const filtered = res.data.products.filter(p => p.id !== id);
        setRelated(filtered);
      });
  };

  const handleAddToCart = () => {
    axios.post('http://localhost/backend/add_to_cart.php', {
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }, {
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.data.success) {
        alert("✅ Product added to cart!");
      } else {
        alert('❌ Failed to add to cart.');
      }
    }).catch(err => {
      console.error("Add to Cart Error:", err);
      alert("❌ Error while adding to cart.");
    });
  };

  const handleBuyNow = () => {
    if (!product || !product.name || !product.price || !product.image) {
      alert("❌ Invalid product. Cannot proceed to checkout.");
      return;
    }

    navigate('/checkout', { state: { singleProduct: product } });
  };

  const renderStars = () => {
    const stars = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
    return ''.repeat(stars) + ''.repeat(5 - stars);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <div className="prod-details">
        <div className="left">
          <img src={product.image} alt={product.name} />
          <div className="rating"> {renderStars()}</div>
          <div className="like" onClick={() => setLikes(likes + 1)}>❤️ {likes}</div>
        </div>

        <div className="info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>₹{product.price}</h3>
          <div className="btn-group">
            <button onClick={handleAddToCart}>🛒 Add to Cart</button>
            <button className="buy" onClick={handleBuyNow}>⚡ Buy Now</button>
          </div>
        </div>
      </div>

      <div className="related-section">
        <h2>Related Products</h2>
        <div className="related-products">
          {related.map((item, i) => (
            <div className="related-card" key={i} onClick={() => navigate(`/details/${item.id}`)}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <div className="rating">{renderStars()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
