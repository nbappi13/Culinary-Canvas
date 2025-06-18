"use client"

import { useState } from "react"
import { useFoods } from "../../services/foodService"
import FoodCard from "../../components/FoodCard"
import { useTheme } from "../../context/ThemeProvider"

const Foods = () => {
  const { theme } = useTheme()
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    name: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const itemsPerPage = 9

  // Fetch foods with filters and pagination
  const { data: foodsData, isLoading, isError } = useFoods(filters, currentPage)

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, name: searchTerm }))
    setCurrentPage(1) // Reset to first page when searching
  }

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({ category: "", priceRange: "", name: "" })
    setSearchTerm("")
    setCurrentPage(1)
  }

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    if (!foodsData) return null

    const { totalPages, currentPage: current } = foodsData
    const buttons = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Previous button
    if (current > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(current - 1)}
          className="px-3 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>,
      )
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded transition-colors ${
            i === current ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>,
      )
    }

    // Next button
    if (current < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(current + 1)}
          className="px-3 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Next
        </button>,
      )
    }

    return buttons
  }

  return (
    <div className={`min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-8 px-4`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">All Foods</h1>

        {/* Search and filters section */}
        <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow-md mb-8">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for foods..."
                className="flex-1 p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
                <option value="Salad">Salad</option>
              </select>
            </div>

            {/* Price range filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Prices</option>
                <option value="0-10">$0 - $10</option>
                <option value="10-20">$10 - $20</option>
                <option value="20-30">$20 - $30</option>
                <option value="30-50">$30 - $50</option>
                <option value="50-100">$50+</option>
              </select>
            </div>

            {/* Clear filters button */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error loading foods. Please try again later.</p>
          </div>
        )}

        {/* Foods grid and pagination */}
        {!isLoading && !isError && foodsData && (
          <>
            {/* Results summary */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {foodsData.foodItems.length} of {foodsData.totalCount} results
                {filters.name && ` for "${filters.name}"`}
              </p>
            </div>

            {/* Foods grid */}
            {foodsData.foodItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {foodsData.foodItems.map((food) => (
                  <div key={food._id} className="hover:transform hover:scale-105 transition-transform duration-300">
                    <FoodCard food={food} />
                  </div>
                ))}
              </div>
            ) : (
              // No results found
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[var(--text-color)] mb-2">No foods found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {foodsData.totalPages > 1 && (
              <div className="flex justify-center items-center mt-8">
                <div className="pagination-container flex flex-wrap justify-center gap-1">
                  {renderPaginationButtons()}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Foods
