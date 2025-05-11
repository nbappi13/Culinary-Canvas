import React from 'react';
import Banner from '../../components/Banner/Banner';
import TopFoods from '../../components/TopFoods';
import OurStory from '../../components/OurStory/OurStory';
import PrivateDining from '../../components/PrivateDining/PrivateDining'; 
import Events from '../../components/Events/Events';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';


const Home = () => {
  return (
    <div className="home-container">
      <Banner />
      <TopFoods />
      <PrivateDining /> 
      <Events></Events>
      <CustomerReviews />
      <OurStory />
    </div>
  );
};

export default Home;