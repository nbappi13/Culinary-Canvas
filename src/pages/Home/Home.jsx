import React from 'react';
import Banner from '../../components/Banner/Banner';
import TopFoods from '../../components/TopFoods';


const Home = () => {
  return (
    <div className="home-container">
      <Banner />
      <TopFoods />
    </div>
  );
};

export default Home;