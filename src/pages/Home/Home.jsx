import React from 'react';
import Banner from '../../components/Banner/Banner';
import TopFoods from '../../components/TopFoods';
import OurStory from '../../components/OurStory/OurStory';
import PrivateDining from '../../components/PrivateDining/PrivateDining'; 

const Home = () => {
  return (
    <div className="home-container">
      <Banner />
      <TopFoods />
      <PrivateDining /> 
      <OurStory />
    </div>
  );
};

export default Home;