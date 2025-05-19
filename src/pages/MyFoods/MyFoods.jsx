"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthProvider"
import { useMyFoods } from "../../services/foodService"
import UpdateFoodModal from "../../components/UpdateFoodModal/UpdateFoodModal"

const MyFoods = () => {
  const { currentUser } = useAuth()
  const { data: foods, refetch, isFetching } = useMyFoods(currentUser.email)
  const [selectedFood, setSelectedFood] = useState(null)

  const handleUpdateSuccess = () => {
    refetch()
    setSelectedFood(null)
  }

  return (
    <div className="p-6 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">My Foods</h1>

      {isFetching ? (
        <p className="text-center py-4">Loading...</p>
      ) : foods?.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-6">No foods added by you.</p>
      ) : (
        <div className="w-full space-y-4 sm:space-y-0 sm:overflow-x-auto">
       
          <div className="block sm:hidden space-y-4">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-[var(--card-bg)] border border-[var(--border-color,#ddd)] rounded-lg p-4 shadow-md"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={food.image || "/placeholder.svg"}
                    alt={food.name}
                    className="w-20 h-20 object-cover rounded"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{food.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Price: ${typeof food.price === "number" ? food.price.toFixed(2) : food.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFood(food)}
                  className="w-full bg-[var(--button-bg)] text-[var(--button-text)] py-2 px-3 rounded text-sm hover:bg-[var(--button-hover-bg)] transition-colors"
                >
                  Update
                </button>
              </div>
            ))}
          </div>

        
          <div className="hidden sm:block">
            <table className="w-full border-collapse bg-[var(--card-bg)] min-w-[600px]">
              <thead className="bg-[var(--navbar-bg)] text-[var(--navbar-text)]">
                <tr>
                  <th className="p-3 border border-[var(--border-color,#ddd)] text-left">Image</th>
                  <th className="p-3 border border-[var(--border-color,#ddd)] text-left">Name</th>
                  <th className="p-3 border border-[var(--border-color,#ddd)] text-left">Price</th>
                  <th className="p-3 border border-[var(--border-color,#ddd)] text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food._id} className="bg-[var(--card-bg)] transition">
                    <td className="p-3 border border-[var(--border-color,#ddd)]">
                      <img
                        src={food.image || "/placeholder.svg"}
                        alt={food.name}
                        className="w-14 h-14 object-cover rounded"
                        loading="lazy"
                      />
                    </td>
                    <td className="p-3 border border-[var(--border-color,#ddd)]">{food.name}</td>
                    <td className="p-3 border border-[var(--border-color,#ddd)]">
                      ${typeof food.price === "number" ? food.price.toFixed(2) : food.price}
                    </td>
                    <td className="p-3 border border-[var(--border-color,#ddd)]">
                      <button
                        onClick={() => setSelectedFood(food)}
                        className="bg-[var(--button-bg)] text-[var(--button-text)] py-2 px-3 rounded text-sm hover:bg-[var(--button-hover-bg)] transition-colors"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedFood && (
        <UpdateFoodModal
          key={selectedFood._id}
          food={selectedFood}
          onSuccess={handleUpdateSuccess}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  )
}

export default MyFoods
