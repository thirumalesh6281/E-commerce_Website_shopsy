import React from 'react';
import './styles/categories.css';
import { Link } from 'react-router-dom';


const categoryList = [
  {
    title: 'Men',
    image: 'categories/men.jpg',
    bgColor: '#008b8b',
  },
  {
    title: 'Women',
    image: 'categories/women.jpg',
    bgColor: '#008b8b',
  },
  {
    title: 'Kids',
    image: 'categories/kid.jpg',
    bgColor: '#008b8b',
  },
  {
    title: 'Electronics',
    image: 'categories/electronic.jpg',
    bgColor: '#008b8b',
  },
  {
    title: 'Mobiles',
    image: 'categories/mobile.jpg',
    bgColor: '#008b8b',
  },
];

const Categories = () => {
  return (
    <div className="categories-container">
      <h2 className="categories-title">SHOP BY CATEGORY</h2>
      <div className="categories-grid">
        {categoryList.map((category, index) => (
            <Link
              to={`/${category.title.toLowerCase()}`} // dynamic routing: /men, /women, etc.
              key={index}
              className="category-card-link"
            >
              <div
                className="category-card"
                style={{ backgroundColor: category.bgColor }}
              >
                <div className="category-img-wrapper">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="category-image"
                  />
                </div>
                <p className="category-name">{category.title}</p>
              </div>
            </Link>
          ))}

      </div>
    </div>
  );
};

export default Categories;
