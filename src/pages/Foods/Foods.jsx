"use client";

import { useState, useEffect, useRef } from "react";
import FoodCard from "../../components/FoodCard";
import { useFoods } from "../../services/foodService";
import { PuffLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeProvider";

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
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#36D7B7" size={150} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-5 dark:text-red-400">
        {error.message}
      </div>
    );
  }

  const sortedFoodItems = getSortedFoodItems(data.foodItems);

  return (
    <div
      className={`p-8 min-h-screen transition duration-300 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-white"
      }`}
    >
      <h1 className="text-center text-3xl font-bold mb-6">All Foods</h1>

      <div className="filters-container">
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search food by name..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={handleSearch}
            ref={inputRef}
          />
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.3 },
          },
        }}
      >
        {sortedFoodItems.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1"
          />
        ))}
      </motion.div>

      <div className="mt-8 flex justify-center">
        {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Foods;
