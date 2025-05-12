import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import TopFoods from "../../components/TopFoods";
import OurStory from "../../components/OurStory/OurStory";
import PrivateDining from "../../components/PrivateDining/PrivateDining";
import Events from "../../components/Events/Events";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToOurStory) {
     
      const ourStorySection = document.querySelector(".our-story-container");
      if (ourStorySection) {
        ourStorySection.scrollIntoView({ behavior: "smooth" });

   
        const readMoreButton =
          ourStorySection.querySelector(".read-more-button");
        if (readMoreButton) {
          readMoreButton.click();
        }
      }
    }
  }, [location.state]);

  return (
    <div className="home-container">
      <Banner />
      <TopFoods />
      <PrivateDining />
      <Events />
      <CustomerReviews />
      <OurStory />
    </div>
  );
};

export default Home;
