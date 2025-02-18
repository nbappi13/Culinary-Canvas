import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTopSellingFoods } from '../services/foodService'; 
import FoodCard from './FoodCard';
import { useNavigate } from 'react-router-dom';
import '../styles/TopFoods.css';

const TopFoods = () => {
  const navigate = useNavigate();

  
  const { data: topFoods, isLoading, isError } = useQuery({
    queryKey: ['top-foods'],
    queryFn: getTopSellingFoods,
  });

 
  const handleSeeAll = () => {
    navigate('/all-foods');
  };

  return (
    <div className="top-foods-container">
      <h2 className="top-foods-title">Top Foods</h2>

     
      {isLoading && <p>Loading top foods...</p>}

    
      {isError && <p>Error loading top foods. Please try again later.</p>}

    
      {!isLoading && !isError && (
        <>
          <div className="top-foods-grid">
            {topFoods.length > 0 ? (
              topFoods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))
            ) : (
              <p>No top foods available.</p>
            )}
          </div>

       
          <button onClick={handleSeeAll} className="see-all-button">
            See All
          </button>
        </>
      )}
    </div>
  );
};

export default TopFoods;