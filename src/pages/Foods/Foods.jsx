
import React, { useEffect, useState } from 'react';
import FoodCard from '../../components/FoodCard';
import { getAllFoods } from '../../services/foodService';
import '../../styles/Foods.css';

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const data = await getAllFoods();
        if (Array.isArray(data) && data.length > 0) {
          setFoods(data);
        } else {
          setError('No foods found');
        }
      } catch (error) {
        setError('Failed to fetch foods');
      }
    }

    fetchFoods();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="foods-container">
      <h1 className="text-center text-3xl font-bold mb-6">All Foods</h1>
      <div className="food-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Foods;