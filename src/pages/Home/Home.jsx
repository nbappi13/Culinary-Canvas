import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopFoods from "../../components/TopFoods";
import OurStory from "../../components/OurStory/OurStory";
import PrivateDining from "../../components/PrivateDining/PrivateDining";
import Events from "../../components/Events/Events";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import DiscountEvents from "../../components/DiscountEvents/DiscountEvents";

const Home = () => {
  // Get current location for navigation
  const location = useLocation();

  // Handle scroll to Our Story section when needed
  useEffect(() => {
    if (location.state?.scrollToOurStory) {
      // Find Our Story section
      const ourStorySection = document.querySelector(".our-story-container");
      if (ourStorySection) {
        // Smooth scroll to section
        ourStorySection.scrollIntoView({ behavior: "smooth" });

        // Click the Read More button if found
        const readMoreButton = ourStorySection.querySelector(".read-more-button");
        if (readMoreButton) {
          readMoreButton.click();
        }
      }
    }
  }, [location.state]);

  // Main home page layout
  return (
    <div className="home-container">
      {/* Featured food section */}
      <TopFoods />
      
      {/* Private dining section */}
      <PrivateDining />
      
      {/* Discount offers section */}
      <DiscountEvents></DiscountEvents>
      
      {/* Events section */}
      <Events />
      
      {/* Customer reviews section */}
      <CustomerReviews />
      
      {/* Our story section */}
      <OurStory />
    </div>
  );
};

export default Home;