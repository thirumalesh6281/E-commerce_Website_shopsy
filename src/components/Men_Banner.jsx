import React from 'react';
import './styles/men_banner.css';

const Men_Banner = ({ image = "/banner/men_banner.jpg", altText = "Men's Banner" }) => {
  return (
    <div className="men-banner2">
      <img src={image} alt={altText} className="men-banner-img2" />
    </div>
  );
};

export default Men_Banner;
