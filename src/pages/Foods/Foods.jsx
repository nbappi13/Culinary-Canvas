import React, { useState } from 'react';
import FoodCard from '../../components/FoodCard';
import { useFoods } from '../../services/foodService';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import '../../styles/Foods.css';

const Foods = () => {
  const [filters, setFilters] = useState({});
  const { data: foods, isLoading, isError, error } = useFoods(filters);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  if (isLoading) {
    return <div className="spinner-container"><ClipLoader /></div>;
  }

  if (isError) {
    return <div className="error-message">{error.message}</div>;
  }

  return (
    <div className="foods-container">
      <h1 className="text-center text-3xl font-bold mb-6">All Foods</h1>
      <div className="filters-container">
        {/* Add your filter inputs here and call handleFilterChange on change */}
      </div>
      <motion.div
        className="food-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.8
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.3
            }
          }
        }}
      >
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </motion.div>
    </div>
  );
};

export default Foods;