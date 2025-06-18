"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useFood } from "../../services/foodService"
import { useAuth } from "../../context/AuthProvider"

const SingleFood = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [purchaseCount, setPurchaseCount] = useState(0)

  // Get discount info from sessionStorage (only if coming from discount events)
  const [discountInfo, setDiscountInfo] = useState(
    JSON.parse(sessionStorage.getItem("discountInfo") || "{}")
  )
  const isDiscounted = discountInfo.isDiscounted || false

  // Fetch food details by ID
  const { data: food, isLoading, isError } = useFood(id)

  // Update purchase count when food data changes
  useEffect(() => {
    if (food) {
      setPurchaseCount(food.purchaseCount || 0)
    }
  }, [food])

  // Listen for purchase success events to update data
  useEffect(() => {
    const handlePurchaseSuccess = async () => {
      try {
        // Refetch food data after successful purchase
        const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/foods/${id}`)
        if (response.ok) {
          const updatedFood = await response.json()
          setPurchaseCount(updatedFood.purchaseCount || 0)
        }
      } catch (error) {
        console.error("Error fetching updated food:", error)
      }
    }

    // Add event listener for purchase success
    window.addEventListener("purchaseSuccess", handlePurchaseSuccess)

    return () => {
      window.removeEventListener("purchaseSuccess", handlePurchaseSuccess)
    }
  }, [id])

  // Clear discount info when component unmounts
  useEffect(() => {
    return () => {
      // Clear discount info when leaving the page
      if (isDiscounted) {
        sessionStorage.removeItem("discountInfo")
      }
    }
  }, [isDiscounted])

  // Handle purchase button click
  const handlePurchase = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: { pathname: `/purchase/${id}` } } })
      return
    }
    
    // Set discount info again before navigating to purchase page
    if (isDiscounted) {
      sessionStorage.setItem("discountInfo", JSON.stringify(discountInfo))
    }
    
    navigate(`/purchase/${id}`)
  }

  // Format price display
  const formatPrice = (price) => {
    return `$${Number.parseFloat(price).toFixed(2)}`
  }

  // Calculate savings for discounted items
  const calculateSavings = (originalPrice, discountPrice) => {
    return formatPrice(originalPrice - discountPrice)
  }

  // Get the price to display (discounted or regular)
  const getDisplayPrice = () => {
    // Only show discount price if this item is actually discounted AND has discount info
    if (isDiscounted && discountInfo.discountedPrice && food) {
      return discountInfo.discountedPrice
    }
    return food?.price || 0
  }

  // Check if we should show discount pricing
  const shouldShowDiscount = () => {
    return isDiscounted && discountInfo.discountedPrice && discountInfo.discountPercentage && food
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  // Error state
  if (isError || !food) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error loading food details. Please try again later.</p>
          <button
            onClick={() => navigate("/all-foods")}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Foods
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center p-8 bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="max-w-[800px] w-full bg-[var(--card-bg)] rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center">
        {/* Show discount badge only if this is a discounted item */}
        {shouldShowDiscount() && (
          <div className="w-full flex justify-end mb-2">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {discountInfo.discountPercentage}% OFF
            </span>
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{food.name}</h1>
        <img
          src={food.image || "/placeholder.svg"}
          alt={food.name}
          className="max-w-[300px] w-full h-auto rounded-lg mb-4"
          loading="lazy"
        />
        <div className="w-full text-left">
          <p className="mb-2">
            <strong>Category:</strong> {food.category}
          </p>
          <p className="mb-2">
            <strong>Quantity:</strong> {food.quantity}
          </p>

          {/* Price section - show discount or regular price */}
          {shouldShowDiscount() ? (
            <div className="mb-2">
              <p className="mb-1">
                <strong>Price:</strong>{" "}
                <span className="text-2xl font-bold text-green-600">{formatPrice(discountInfo.discountedPrice)}</span>
              </p>
              <p className="mb-1">
                <strong>Original Price:</strong>{" "}
                <span className="line-through text-gray-500">{formatPrice(food.price)}</span>
              </p>
              <p className="mb-2">
                <strong>You Save:</strong>{" "}
                <span className="text-red-600 font-bold">
                  {calculateSavings(food.price, discountInfo.discountedPrice)}
                </span>
              </p>
            </div>
          ) : (
            <p className="mb-2">
              <strong>Price:</strong> {formatPrice(food.price)}
            </p>
          )}

          <p className="mb-2">
            <strong>Purchase Count:</strong> {purchaseCount}
          </p>
          <p className="mb-2">
            <strong>Short Description:</strong> {food.description.shortDescription}
          </p>
          <p className="mb-2">
            <strong>Ingredients:</strong>
          </p>
          <ul className="pl-4 mb-2">
            {food.description.ingredients &&
              food.description.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
          </ul>
          <p className="mb-2">
            <strong>Making Procedure:</strong> {food.description.makingProcedure}
          </p>
          <p className="mb-2">
            <strong>Food Origin:</strong> {food.foodOrigin}
          </p>

          {/* Special discount notice */}
          {shouldShowDiscount() && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-1">🔥 Special Discount!</h4>
              <p className="text-red-600 dark:text-red-400 text-sm">
                Limited time offer - {discountInfo.discountPercentage}% off the regular price!
              </p>
            </div>
          )}

          <button
            onClick={handlePurchase}
            className={`py-2 px-4 border-none rounded cursor-pointer transition-colors duration-200 mt-4 self-center ${
              shouldShowDiscount()
                ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                : "bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover-bg)]"
            }`}
          >
            {shouldShowDiscount() ? "Get Discount Deal" : "Purchase"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleFood