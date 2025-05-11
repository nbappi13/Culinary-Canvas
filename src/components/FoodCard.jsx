"use client"
import { useNavigate } from "react-router-dom"
import "../styles/FoodCard.css"

const FoodCard = ({ food }) => {
  const navigate = useNavigate()

  const handleDetailsClick = () => {
    navigate(`/food/${food._id}`)
  }

 
  const formatPrice = (price) => {
    return `$${Number.parseFloat(price).toFixed(2)}`
  }

 
  const truncateText = (text, maxLength) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  return (
    <div className="food-card">
      <div className="food-card-image-container">
        <img src={food.image || "/placeholder.svg"} alt={food.name} className="food-image" />
        <div className="food-card-overlay">
          <span className="food-card-category">Top Seller</span>
        </div>
      </div>

      <div className="food-card-content">
        <div className="food-card-header">
          <h2 className="food-name">{food.name}</h2>
          <div className="food-price">{formatPrice(food.price)}</div>
        </div>

        <p className="food-shortDescription">{truncateText(food.shortDescription, 100)}</p>

        <button onClick={handleDetailsClick} className="details-button">
          View Details
        </button>
      </div>
    </div>
  )
}

export default FoodCard
