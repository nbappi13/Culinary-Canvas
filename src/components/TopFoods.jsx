import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FoodCard from './FoodCard';
import '../styles/TopFoods.css';

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const response = await axios.get('/api/top-foods');
        setTopFoods(response.data);
      } catch (error) {
        console.error('Error fetching top foods:', error);
      }
    };

    fetchTopFoods();
  }, []);

  const handleSeeAll = () => {
    navigate('/all-foods');
  };

  return (
    <div className="top-foods-container">
      <h2 className="top-foods-title">Top Foods</h2>
      <div className="top-foods-grid">
        {topFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
      <button onClick={handleSeeAll} className="see-all-button">See All</button>
    </div>
  );
};

export default TopFoods;