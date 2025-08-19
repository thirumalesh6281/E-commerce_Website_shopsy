import React, { useState, useEffect, useRef } from 'react';
import './styles/banner.css'; 

const banners = [
  '/banner/banner_1.1.jpg',
  '/banner/banner_1.2.jpg',
  '/banner/banner3.jpg',
  '/banner/banner7.jpg',
  '/banner/banner4.jpg',

];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const transitionDuration = 500; // 0.5s
  const delay = 3000; // 2 seconds

  // Duplicate first slide at end for seamless transition
  const allBanners = [...banners, banners[0]];

  useEffect(() => {
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearInterval(interval);
  }, []);

  // Reset animation when reaching the fake slide (last duplicate)
  useEffect(() => {
    const slider = sliderRef.current;

    if (index === allBanners.length - 1) {
      // Wait until transition ends
      const timeout = setTimeout(() => {
        slider.style.transition = 'none';
        setIndex(0); // Instantly reset to first slide (real one)
        // Re-enable transition for next slides
        setTimeout(() => {
          slider.style.transition = `transform ${transitionDuration}ms ease-in-out`;
        }, 20);
      }, transitionDuration);

      return () => clearTimeout(timeout);
    }
  }, [index, allBanners.length]);

  return (
    <div className="banner-container">
      <div
        className="banner-slider"
        ref={sliderRef}
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: `transform ${transitionDuration}ms ease-in-out`
        }}
      >
        {allBanners.map((image, i) => (
          <div className="banner-slide" key={i}>
            <img src={image} alt={`Banner ${i + 1}`} className="banner-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
