"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const SingleFood = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [food, setFood] = useState(null)
  const [purchaseCount, setPurchaseCount] = useState(0)

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`https://b10-a11-server-side-chi.vercel.app/api/foods/${id}`)
        if (response.status === 200) {
          setFood(response.data)
          setPurchaseCount(response.data.purchaseCount || 0)
        } else {
          navigate("/not-found")
        }
      } catch (error) {
        console.error("Error fetching food:", error)
        navigate("/not-found")
      }
    }

    fetchFood()

    const handlePurchaseSuccess = async () => {
      try {
        const response = await axios.get(`https://b10-a11-server-side-chi.vercel.app/api/foods/${id}`)
        if (response.status === 200) {
          setFood(response.data)
          setPurchaseCount(response.data.purchaseCount || 0)
        }
      } catch (error) {
        console.error("Error fetching updated food:", error)
      }
    }

    window.addEventListener("purchaseSuccess", handlePurchaseSuccess)

    return () => {
      window.removeEventListener("purchaseSuccess", handlePurchaseSuccess)
    }
  }, [id, navigate])

  const handlePurchaseClick = () => {
    navigate(`/purchase/${id}`)
  }

  if (!food) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-center p-8 bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="max-w-[800px] w-full bg-[var(--card-bg)] rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center">
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
          <p className="mb-2">
            <strong>Price:</strong> ${food.price}
          </p>
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
          <button
            onClick={handlePurchaseClick}
            className="bg-[var(--button-bg)] text-[var(--button-text)] py-2 px-4 border-none rounded cursor-pointer transition-colors duration-200 hover:bg-[var(--button-hover-bg)] mt-4 self-center"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleFood
