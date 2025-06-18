
"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { AuthContext } from "../../context/AuthProvider"
import "../../styles/FoodPurchase.css"
import axiosInstance from "../../utils/axiosInstance"

const FoodPurchase = () => {
  const { id } = useParams() 
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext) // Get current user info
  const [food, setFood] = useState(null) // Store food data
  const [quantity, setQuantity] = useState(1) // Quantity to purchase
  const [isAvailable, setIsAvailable] = useState(true) // Check if food is available
  const [discountInfo, setDiscountInfo] = useState(null) // Store discount info
  const [loading, setLoading] = useState(true) // Loading state

  useEffect(() => {
    // Check for discount info in session storage
    const storedDiscountInfo = sessionStorage.getItem("discountInfo")
    if (storedDiscountInfo) {
      setDiscountInfo(JSON.parse(storedDiscountInfo))
      sessionStorage.removeItem("discountInfo") // Clear after getting
    }

    // Fetch food details from API
    const fetchFood = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/foods/${id}`)
        setFood(response.data)
        setIsAvailable(response.data.quantity > 0) // Set availability
      } catch (error) {
        console.error("Error fetching food:", error)
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch food details.",
          icon: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFood()
  }, [id])

  // Handle purchase button click
  const handlePurchase = async () => {
    try {
      // Use discounted price if available
      const priceToUse = discountInfo?.isDiscounted ? discountInfo.discountedPrice : food.price

      // Prepare purchase data
      const purchaseData = {
        foodId: food._id,
        foodName: food.name,
        price: priceToUse,
        quantity,
        buyerName: currentUser.displayName || currentUser.name || "Guest",
        buyerEmail: currentUser.email,
      }

      // Send purchase request
      const response = await axiosInstance.post(`/foods/${id}/purchase`, purchaseData)

      if (response.status === 201) {
        // Show success message
        Swal.fire({
          title: "Purchase Successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        })

        // Trigger event to update other components
        window.dispatchEvent(new CustomEvent("purchaseSuccess"))
        navigate(`/food/${id}`) // Go back to food page
      }
    } catch (error) {
      // Handle errors
      console.error("Purchase error:", error)
      let errorMessage = "An error occurred while making the purchase."
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "You are not authorized. Please log in again."
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message
        }
      }
      Swal.fire({
        title: "Purchase Failed!",
        text: errorMessage,
        icon: "error",
      })
    }
  }

  // Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If no food found
  if (!food) {
    return <div>Food not found</div>
  }

  // Calculate price to display (discounted or regular)
  const displayPrice = discountInfo?.isDiscounted ? discountInfo.discountedPrice : food.price

  return (
    <div className="food-purchase-container">
      <h1 className="text-center text-3xl font-bold mb-6">Purchase {food.name}</h1>
      
      {/* Show discount banner if available */}
      {discountInfo?.isDiscounted && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center">
          <p className="font-semibold">Special Discount: {discountInfo.discountPercentage}% OFF!</p>
        </div>
      )}
      
      <div className="purchase-form">
        <div className="food-image-container">
          <img src={food.image || "/placeholder.svg"} alt={food.name} className="food-image" />
        </div>
        
        <div className="food-details-container">
          {/* Food details */}
          <p><strong>Food Name:</strong> {food.name}</p>
          
          {/* Price display (shows discount if available) */}
          <p>
            <strong>Price:</strong>
            {discountInfo?.isDiscounted ? (
              <span>
                <span className="line-through text-gray-500 mr-2">${food.price.toFixed(2)}</span>
                <span className="text-green-600">${displayPrice.toFixed(2)}</span>
              </span>
            ) : (
              <span>${displayPrice.toFixed(2)}</span>
            )}
          </p>
          
          {/* Quantity selector */}
          <div className="quantity-input">
            <label><strong>Quantity:</strong></label>
            <input
              type="number"
              value={quantity}
              min="1"
              max={food.quantity}
              onChange={(e) => setQuantity(Math.min(Number.parseInt(e.target.value) || 1, food.quantity))}
            />
          </div>
          
          {/* Buyer info */}
          <p><strong>Buyer Name:</strong> {currentUser.displayName || currentUser.name || "Guest"}</p>
          <p><strong>Buyer Email:</strong> {currentUser.email}</p>
          
          {/* Out of stock message */}
          {!isAvailable && <p className="error-message">This item is not available for purchase.</p>}
          
          {/* Purchase button */}
          <button
            onClick={handlePurchase}
            className="purchase-button"
            disabled={!isAvailable || quantity > food.quantity || quantity < 1}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodPurchase