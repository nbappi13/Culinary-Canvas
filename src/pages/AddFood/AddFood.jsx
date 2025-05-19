"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthProvider"
import { useAddFood } from "../../services/foodService"
import Swal from "sweetalert2"

const AddFood = () => {
  const { currentUser } = useAuth()
  const addFoodMutation = useAddFood()
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    quantity: 0,
    price: 0.0,
    origin: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newFood = {
      ...formData,
      addedBy: currentUser.displayName,
      email: currentUser.email,
    }

    try {
      await addFoodMutation.mutateAsync(newFood)
      Swal.fire({
        title: "Food added successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })

      setFormData({
        name: "",
        image: "",
        category: "",
        quantity: 0,
        price: 0.0,
        origin: "",
        description: "",
      })
    } catch (error) {
      console.error("Failed to add food:", error)
      Swal.fire({
        title: "Failed to add food!",
        text: error.message || "An unexpected error occurred.",
        icon: "error",
      })
    }
  }

  return (
    <div className="p-8 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <h1 className="text-center font-bold text-3xl">Add Food</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-[var(--card-bg)] p-8 rounded-lg shadow-md transition-colors duration-300"
      >
        <label className="flex flex-col font-bold text-[var(--text-color)]">
          Food Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border border-[#ddd] rounded bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300"
          />
        </label>
        <label className="flex flex-col font-bold text-[var(--text-color)]">
          Food Image:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="p-2 border border-[#ddd] rounded bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300"
          />
        </label>
        <label className="flex flex-col font-bold text-[var(--text-color)]">
          Food Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="p-2 border border-[#ddd] rounded bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300"
          />
        </label>
        <label className="flex flex-col font-bold text-[var(--text-color)]">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="p-2 border border-[#ddd] rounded bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300"
          />
        </label>
        <label className="flex flex-col font-bold text-[var(--text-color)]">
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="p-2 border border-[#ddd] rounded bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300"
          />
        </label>
        <label className="flex flex-col font-bold text-[var(--text-color)]">
          Food Origin (Country):
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
            className="p-2 border border-[#ddd] rounded bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300"
          />
        </label>
        <label className="flex flex-col font-bold text-[var(--text-color)]">
          Short Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="p-2 border border-[#ddd] rounded bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300"
          />
        </label>
        <button
          type="submit"
          className="bg-[var(--button-bg)] text-[var(--button-text)] py-2 px-4 border-none rounded cursor-pointer transition-colors duration-200 hover:bg-[var(--button-hover-bg)]"
        >
          Add Item
        </button>
      </form>
    </div>
  )
}

export default AddFood
