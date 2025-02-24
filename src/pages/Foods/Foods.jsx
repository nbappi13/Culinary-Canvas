import React, { useState } from "react";
import FoodCard from "../../components/FoodCard";
import { useFoods } from "../../services/foodService";
import { PuffLoader } from "react-spinners";
import { motion } from "framer-motion";
import "../../styles/Foods.css";

const Foods = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useFoods(filters, currentPage);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <PuffLoader color="#36D7B7" size={150} />
      </div>
    );
  }

  if (isError) {
    return <div className="error-message">{error.message}</div>;
  }

  return (
    <div className="foods-container">
      <h1 className="text-center text-3xl font-bold mb-6">All Foods</h1>
      <div className="filters-container">
      
      </div>
      <motion.div
        className="food-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.8,
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.3,
            },
          },
        }}
      >
        {data.foodItems.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </motion.div>
      <div className="pagination-container mt-8 flex justify-center">
        {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Foods;
