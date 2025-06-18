"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useAddFood } from "../../services/foodService"
import { useAuth } from "../../context/AuthProvider"

const AddFood = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const addFoodMutation = useAddFood()

  // Form state for new food item
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    quantity: "",
    price: "",
    origin: "",
    description: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    if (!formData.name || !formData.image || !formData.category || !formData.quantity || !formData.price) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields.",
        icon: "warning",
      })
      setIsSubmitting(false)
      return
    }

    // Prepare new food data
    const newFoodData = {
      name: formData.name,
      image: formData.image,
      category: formData.category,
      quantity: Number.parseInt(formData.quantity, 10),
      price: Number.parseFloat(formData.price),
      addedBy: currentUser.displayName || "Anonymous",
      email: currentUser.email,
      origin: formData.origin,
      description: formData.description,
    }

    try {
      await addFoodMutation.mutateAsync(newFoodData)

      Swal.fire({
        title: "Food Added Successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })

      // Reset form and navigate to my foods
      setFormData({
        name: "",
        image: "",
        category: "",
        quantity: "",
        price: "",
        origin: "",
        description: "",
      })
      navigate("/my-foods")
    } catch (error) {
      console.error("Error adding food:", error)
      Swal.fire({
        title: "Error",
        text: "Failed to add food item. Please try again.",
        icon: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Add New Food Item</h1>

        {/* Add food form */}
        <form onSubmit={handleSubmit} className="bg-[var(--card-bg)] p-6 rounded-lg shadow-md">
          {/* Food name and category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Food Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter food name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
                <option value="Salad">Salad</option>
              </select>
            </div>
          </div>

          {/* Price and quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Available quantity"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Food origin */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Food Origin</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Italian, Chinese, Mexican"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
              placeholder="Describe your food item..."
            />
          </div>

          {/* Submit and cancel buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/my-foods")}
              className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Food"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFood
