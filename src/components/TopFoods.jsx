"use client"
import { useQuery } from "@tanstack/react-query"
import { getTopSellingFoods } from "../services/foodService"
import FoodCard from "./FoodCard"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeProvider"

const TopFoods = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

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
    <div
      className={`w-full bg-[var(--bg-color)] text-[var(--text-color)] relative overflow-hidden rounded-none ${
        theme === "light" ? "bg-[#f7f9fc]" : ""
      }`}
    >
      <h2 className="text-center text-4xl md:text-[2.2rem] lg:text-[2.3rem] xl:text-[2.5rem] mt-10 mb-8 md:mb-10 lg:mb-12 relative font-bold after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-[60px] after:h-[3px] after:bg-gradient-to-r after:from-[var(--button-bg)] after:to-[var(--button-hover-bg)] after:rounded-md">
        Top Foods
      </h2>

      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[var(--button-bg)] rounded-full animate-spin mb-4"></div>
          <p>Loading top foods...</p>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <p>Error loading top foods. Please try again later.</p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {topFoods && topFoods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {topFoods.slice(0, 6).map((food, index) => (
                <div
                  key={food._id}
                  className={`w-full transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-lg hover:z-10`}
                >
                  <FoodCard food={food} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg p-6">No top foods available.</p>
          )}

          <button
            onClick={handleSeeAll}
            className="block mx-auto my-10 py-3 px-7 md:py-3 md:px-8 bg-[var(--button-bg)] text-[var(--button-text)] border-none rounded-[30px] text-base md:text-lg font-bold cursor-pointer transition-all duration-300 shadow-md hover:bg-[var(--button-hover-bg)] hover:-translate-y-[3px] hover:shadow-lg"
          >
            See All
          </button>
        </>
      )}
    </div>
  )
}

export default TopFoods
