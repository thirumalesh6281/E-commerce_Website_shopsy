// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './styles/productSection.css';
// import { useNavigate } from 'react-router-dom';

// const Women_prod = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get('http://localhost/backend/get_products.php?category=women')
//       .then((res) => {
//         if (res.data && Array.isArray(res.data.products)) {
//           const latest = res.data.products.slice(0, 12);
//           setProducts(latest);
//         } else {
//           setProducts([]);
//         }
//       })
//       .catch((err) => {
//         console.error('Fetch error:', err);
//         setProducts([]);
//       });
//   }, []);

//   const handleAddToCart = (product) => {
//     axios
//       .post('http://localhost/backend/add_to_cart.php', {
//         product_id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//       })
//       .then((res) => {
//         if (res.data.success) {
//           alert(`${product.name} added to cart!`);
//         } else {
//           alert('Failed to add to cart.');
//         }
//       })
//       .catch((error) => {
//         console.error('Add to cart error:', error);
//         alert('Error adding to cart.');
//       });
//   };

//   const handleBuyNow = (product) => {
//     handleAddToCart(product);
//     navigate('/cart');
//   };

//   return (
//     <div className="product-section">
//       {/* <h2>👗 Featured Women's Products</h2> */}
//       <div className="product-list">
//         {products.map((product, index) => (
//           <div key={index} className="product-card">
//             <img src={product.image} alt={product.name} />
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p><strong>₹{product.price}</strong></p>
//             {/* <div className="button-group">
//               <button className="btn-add" onClick={() => handleAddToCart(product)}>Add to Cart</button>
//               <button className="btn-buy" onClick={() => handleBuyNow(product)}>Buy Now</button>
//             </div> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Women_prod;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/productSection.css';
import { useNavigate } from 'react-router-dom';

const Women_prod = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost/backend/get_products.php?category=women')
      .then((res) => {
        if (res.data && Array.isArray(res.data.products)) {
          // Show only 10 products
          const latest = res.data.products.slice(0, 10);
          setProducts(latest);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setProducts([]);
      });
  }, []);

  const handleAddToCart = (product) => {
    axios
      .post('http://localhost/backend/add_to_cart.php', {
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      .then((res) => {
        if (res.data.success) {
          alert(`${product.name} added to cart!`);
        } else {
          alert('Failed to add to cart.');
        }
      })
      .catch((error) => {
        console.error('Add to cart error:', error);
        alert('Error adding to cart.');
      });
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    navigate('/cart');
  };

  const goToDetails = (productId) => {
    navigate(`/details/${productId}`);
  };

  return (
    <div className="product-section">
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => goToDetails(product.id)}
            style={{ cursor: 'pointer' }}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            {/* <p>{product.description}</p> */}
            <p><strong>₹{product.price}</strong></p>

            {/* If you want buttons later, uncomment this */}
            {/*
            <div className="button-group">
              <button
                className="btn-add"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                Add to Cart
              </button>
              <button
                className="btn-buy"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow(product);
                }}
              >
                Buy Now
              </button>
            </div>
            */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Women_prod;
