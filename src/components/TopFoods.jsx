"use client"
import { useQuery } from "@tanstack/react-query"
import { getTopSellingFoods } from "../services/foodService"
import FoodCard from "./FoodCard"
import { useNavigate } from "react-router-dom"
import "../styles/TopFoods.css"

const TopFoods = () => {
  const navigate = useNavigate()

  const {
    data: topFoods,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["top-foods"],
    queryFn: getTopSellingFoods,
  })

  const handleSeeAll = () => {
    navigate("/all-foods")
  }

  return (
    <div className="top-foods-container">
      <h2 className="top-foods-title">Top Foods</h2>

      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading top foods...</p>
        </div>
      )}

      {isError && (
        <div className="error-container">
          <p>Error loading top foods. Please try again later.</p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {topFoods && topFoods.length > 0 ? (
            <div className="responsive-cascade-layout">
              {topFoods.slice(0, 6).map((food, index) => (
                <div
                  key={food._id}
                  className={`card-wrapper card-position-${index + 1} ${
                    index >= 3 ? "hide-on-small" : ""
                  }`}
                >
                  <FoodCard food={food} />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-foods">No top foods available.</p>
          )}

          <button onClick={handleSeeAll} className="see-all-button">
            See All
          </button>
        </>
      )}
    </div>
  )
}

export default TopFoods