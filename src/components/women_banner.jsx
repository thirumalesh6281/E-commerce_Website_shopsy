import React from 'react';
import './styles/men_banner.css';

const Women_banner = ({ image = "/banner/women_banner.jpg", altText = "Men's Banner" }) => {
  return (
    <div className="men-banner2">
      <img src={image} alt={altText} className="men-banner-img2" />
    </div>
  );
};

export default Women_banner;
