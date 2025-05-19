"use client"

import { useState, useEffect } from "react"
import Modal from "react-modal"
import Swal from "sweetalert2"
import { useUpdateFood } from "../../services/foodService"
import { useAuth } from "../../context/AuthProvider"

Modal.setAppElement("#root")

const UpdateFoodModal = ({ food, onSuccess, onClose }) => {
  const { currentUser } = useAuth()
  const updateFoodMutation = useUpdateFood()

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    quantity: "",
    price: "",
    description: { shortDescription: "", foodOrigin: "" },
  })

  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (food) {
      setFormData({
        ...food,
        description: {
          shortDescription: food.description?.shortDescription || "",
          foodOrigin: food.description?.foodOrigin || "",
        },
      })
    }
  }, [food])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name in formData.description) {
      setFormData((prevData) => ({
        ...prevData,
        description: { ...prevData.description, [name]: value },
      }))
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUpdating(true)

    const updatedFoodData = {
      name: formData.name,
      image: formData.image,
      category: formData.category,
      quantity: Number.parseInt(formData.quantity, 10),
      price: Number.parseFloat(formData.price),
      description: {
        shortDescription: formData.description.shortDescription,
        foodOrigin: formData.description.foodOrigin,
      },
    }

    try {
      await updateFoodMutation.mutateAsync({
        id: food._id,
        foodData: updatedFoodData,
        email: currentUser.email,
      })

      Swal.fire({
        title: "Update Successful!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })

      onSuccess()
    } catch (error) {
      console.error("Error updating food:", error.message)
    } finally {
      setIsUpdating(false)
      onClose()
    }
  }

 
  const customStyles = {
    content: {
      position: "fixed",
      top: "10%",
      bottom: "10%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--card-bg)",
      color: "var(--text-color)",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      width: "90vw",
      maxWidth: "600px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontSize: "14px",
      border: "none",
      padding: "0",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      overflowY: "auto",
      zIndex: 50,
    },
  }

  return (
    <Modal isOpen={!!food} onRequestClose={onClose} contentLabel="Update Food" style={customStyles}>
      <div className="flex-1 overflow-y-auto p-5 max-h-[calc(80vh-100px)]">
        <h2 className="text-xl font-bold mb-4 text-[var(--text-color)]">Update Food</h2>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex flex-wrap gap-3 mb-4 sm:flex-row flex-col">
            <label className="w-full sm:w-[48%] flex flex-col">
              <span className="mb-1 font-medium">Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isUpdating}
                className="w-full p-[0.35rem] border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent"
              />
            </label>
            <label className="w-full sm:w-[48%] flex flex-col">
              <span className="mb-1 font-medium">Price:</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={isUpdating}
                className="w-full p-[0.35rem] border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3 mb-4 sm:flex-row flex-col">
            <label className="w-full sm:w-[48%] flex flex-col">
              <span className="mb-1 font-medium">Quantity:</span>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                disabled={isUpdating}
                className="w-full p-[0.35rem] border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent"
              />
            </label>
            <label className="w-full sm:w-[48%] flex flex-col">
              <span className="mb-1 font-medium">Category:</span>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isUpdating}
                className="w-full p-[0.35rem] border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3 mb-4 sm:flex-row flex-col">
            <label className="w-full sm:w-[48%] flex flex-col">
              <span className="mb-1 font-medium">Image URL:</span>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                disabled={isUpdating}
                className="w-full p-[0.35rem] border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent"
              />
            </label>
            <label className="w-full sm:w-[48%] flex flex-col">
              <span className="mb-1 font-medium">Origin:</span>
              <input
                type="text"
                name="foodOrigin"
                value={formData.description.foodOrigin}
                onChange={handleChange}
                disabled={isUpdating}
                className="w-full p-[0.35rem] border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent"
              />
            </label>
          </div>

          <label className="w-full flex flex-col mb-4">
            <span className="mb-1 font-medium">Description:</span>
            <textarea
              name="shortDescription"
              value={formData.description.shortDescription}
              onChange={handleChange}
              disabled={isUpdating}
              className="w-full p-[0.35rem] border border-gray-300 rounded-md bg-[var(--bg-color)] text-[var(--text-color)] text-sm resize-vertical min-h-[60px] max-h-[120px] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent"
            />
          </label>
        </form>
      </div>

      <div className="p-4 sm:p-5 border-t border-gray-700/10 flex sm:justify-end sm:gap-4 sm:flex-row flex-col gap-2">
        <button
          onClick={handleSubmit}
          disabled={isUpdating}
          className="py-2 px-4 border-none bg-[var(--button-bg)] text-[var(--button-text)] rounded-md cursor-pointer text-sm min-w-[90px] transition-colors duration-200 hover:bg-[var(--button-hover-bg)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
        <button
          onClick={onClose}
          disabled={isUpdating}
          className="py-2 px-4 border-none bg-gray-500 text-white rounded-md cursor-pointer text-sm min-w-[90px] transition-colors duration-200 hover:bg-gray-600 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default UpdateFoodModal
