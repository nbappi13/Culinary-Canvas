
"use client"
import { useNavigate } from "react-router-dom"

const FoodCard = ({ food }) => {
  const navigate = useNavigate()

  // Navigate to food details page
  const handleDetailsClick = () => {
    navigate(`/food/${food._id}`)
  }

  // Format price with 2 decimal places
  const formatPrice = (price) => {
    return `$${Number.parseFloat(price).toFixed(2)}`
  }

  // Shorten long text with ...
  const truncateText = (text, maxLength) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-transform duration-300 hover:shadow-lg hover:scale-105">
      {/* Food image with top seller badge */}
      <div className="relative w-full h-48 md:h-52 lg:h-56 overflow-hidden">
        <img
          src={food.image || "/placeholder.svg"}
          alt={food.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-block px-2 py-1 text-xs md:text-sm font-bold bg-blue-600 text-white rounded-full shadow-md">
            Top Seller
          </span>
        </div>
      </div>

      {/* Food details */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white flex-1">
            {food.name}
          </h2>
          <div className="text-sm md:text-base lg:text-lg font-bold text-orange-600 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
            {formatPrice(food.price)}
          </div>
        </div>

        {/* Short description */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {truncateText(food.shortDescription, 100)}
        </p>

        {/* View details button */}
        <button
          onClick={handleDetailsClick}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:-translate-y-1"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default FoodCard