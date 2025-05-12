import React, { useState, useEffect, useRef } from "react";
import FoodCard from "../../components/FoodCard";
import { useFoods } from "../../services/foodService";
import { PuffLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeProvider"; 
import "../../styles/Foods.css";

const Foods = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const inputRef = useRef(null);

  const { theme } = useTheme(); 

  const {
    data = { foodItems: [], totalPages: 1 },
    isLoading,
    isError,
    error,
  } = useFoods(filters, currentPage);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    handleFilterChange({ name: debouncedSearchTerm });
  }, [debouncedSearchTerm]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const selectionStart = e.target.selectionStart;

    setSearchTerm(value);

    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = selectionStart;
        inputRef.current.selectionEnd = selectionStart;
      }
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getSortedFoodItems = (foodItems) => {
    if (!debouncedSearchTerm) return foodItems;

    return foodItems.sort((a, b) => {
      const aStartsWith = a.name
        .toLowerCase()
        .startsWith(debouncedSearchTerm.toLowerCase());
      const bStartsWith = b.name
        .toLowerCase()
        .startsWith(debouncedSearchTerm.toLowerCase());

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return a.name.localeCompare(b.name);
    });
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

  const sortedFoodItems = getSortedFoodItems(data.foodItems);

  return (
    <div
      className={`foods-container ${theme === "light" ? "light-foods-bg" : ""}`} 
    >
      <h1 className="text-center text-3xl font-bold mb-6">All Foods</h1>

      <div className="filters-container">
        <div className="search-container mb-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search food by name..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
            ref={inputRef}
          />
        </div>
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
        {sortedFoodItems.map((food) => (
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
