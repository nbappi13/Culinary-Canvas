import React, { useState } from 'react';
import restaurantLogo from '../../assets/restaurant_logo.png';
import '../../styles/OurStory.css';

const OurStory = () => {
  const [expanded, setExpanded] = useState(false);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="our-story-container">
      <h2 className="our-story-title">Our Story</h2>
      <div className="our-story-content">
        <img src={restaurantLogo} alt="Our Restaurant" className="our-story-image" />
        <div className={`our-story-text ${expanded ? 'expanded' : 'collapsed'}`}>
          <p>Welcome to Culinary Canvas, where we bring you the finest culinary experiences. Our journey began in 2024 with a passion for creating delicious and memorable meals. Our mission is to provide exceptional dining experiences with a focus on quality, flavor, and customer satisfaction.</p>
          <p>At Culinary Canvas, we believe in using the freshest ingredients and innovative cooking techniques to craft dishes that delight the senses. Our team of talented chefs is dedicated to bringing you a diverse menu that celebrates both classic and contemporary cuisine.</p>
          <p>Thank you for choosing Culinary Canvas. We look forward to serving you and making every visit a delightful experience.</p>
        </div>
        <button className="read-more-button" onClick={handleReadMore}>
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default OurStory;