import React, { useState } from "react";
import "../../styles/OurStory.css";

const OurStory = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="our-story-container">
      <div className="our-story-card">
        <div className="our-story-title-wrapper">
          <h2 className="our-story-title">Our Story, Mission & Responsibilities</h2>
        </div>
        <div className="our-story-content">
          <div className="our-story-text-section">
            <p className="our-story-paragraph">
              Culinary Canvas began its journey in the early 1950s as a small
              family-owned restaurant. With a passion for authentic flavors and
              a commitment to quality, it quickly became a beloved spot for
              locals. Over the decades, we have preserved our traditions while
              embracing modern culinary techniques to bring you the best dining
              experience.
            </p>
            {expanded && (
              <>
                <h3 className="our-story-subtitle">Our Mission</h3>
                <p className="our-story-paragraph">
                  Our mission is to celebrate the art of cooking by blending
                  tradition with innovation. We aim to create dishes that not
                  only satisfy your taste buds but also tell a story of heritage
                  and passion.
                </p>

                <h3 className="our-story-subtitle">Our Responsibilities</h3>
                <p className="our-story-paragraph">
                  At Culinary Canvas, we are committed to sustainability,
                  supporting local farmers, and providing a welcoming space for
                  our community. Every dish we serve reflects our dedication to
                  these values.
                </p>
              </>
            )}
            <button className="read-more-button" onClick={handleToggle}>
              {expanded ? "Read Less" : "Read More"}
            </button>
          </div>
          {expanded && (
            <div className="our-story-image-section">
              <img
                src="https://i.imgur.com/dFpQvn8.png" 
                alt="Old Restaurant"
                className="our-story-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurStory;
