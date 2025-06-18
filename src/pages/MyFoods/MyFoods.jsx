"use client"

import { useState } from "react"
import { useMyFoods } from "../../services/foodService"
import { useAuth } from "../../context/AuthProvider"
import UpdateFoodModal from "../../components/UpdateFoodModal/UpdateFoodModal"
import { useNavigate } from "react-router-dom"

const MyFoods = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [selectedFood, setSelectedFood] = useState(null)

  // Fetch user's foods using React Query
  const { data: myFoods, isLoading, isError, refetch } = useMyFoods(currentUser?.email)

  // Handle opening update modal
  const handleUpdateClick = (food) => {
    setSelectedFood(food)
  }

  // Handle closing update modal
  const handleCloseModal = () => {
    setSelectedFood(null)
  }

  // Handle successful update
  const handleUpdateSuccess = () => {
    refetch() // Refresh the foods list
    setSelectedFood(null)
  }

  // Navigate to add food page
  const handleAddFood = () => {
    navigate("/add-food")
  }

  // Format price display
  const formatPrice = (price) => {
    return `$${Number.parseFloat(price).toFixed(2)}`
  }

  // Truncate long descriptions
  const truncateText = (text, maxLength) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page header with add button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Food Items</h1>
          <button
            onClick={handleAddFood}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            Add New Food
          </button>
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
            <p className="text-red-500 text-lg">Error loading your foods. Please try again later.</p>
          </div>
        )}

        {/* Foods grid */}
        {!isLoading && !isError && (
          <>
            {myFoods && myFoods.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myFoods.map((food) => (
                  <div
                    key={food._id}
                    className="bg-[var(--card-bg)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Food image */}
                    <div className="h-48 overflow-hidden">
                      <img
                        src={food.image || "/placeholder.svg"}
                        alt={food.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Food details */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[var(--text-color)]">{food.name}</h3>
                        <span className="text-lg font-bold text-green-600">{formatPrice(food.price)}</span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Category: {food.category}</p>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Quantity: {food.quantity} available
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Sold: {food.purchaseCount || 0} times
                      </p>

                      {food.description?.shortDescription && (
                        <p className="text-sm text-[var(--text-color)] mb-4">
                          {truncateText(food.description.shortDescription, 100)}
                        </p>
                      )}

                      {/* Update button */}
                      <button
                        onClick={() => handleUpdateClick(food)}
                        className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors font-semibold"
                      >
                        Update Food
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty state
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[var(--text-color)] mb-2">No food items yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start by adding your first food item to share with customers.
                </p>
                <button
                  onClick={handleAddFood}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Add Your First Food
                </button>
              </div>
            )}
          </>
        )}

        {/* Update food modal */}
        {selectedFood && (
          <UpdateFoodModal food={selectedFood} onSuccess={handleUpdateSuccess} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  )
}

export default MyFoods
