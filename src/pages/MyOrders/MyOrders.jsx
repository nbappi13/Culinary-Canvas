"use client"

import { useState } from "react"
import { useMyOrders, useDeleteOrder } from "../../services/foodService"
import { useAuth } from "../../context/AuthProvider"
import Swal from "sweetalert2"

const MyOrders = () => {
  const { currentUser } = useAuth()
  const [deletingOrderId, setDeletingOrderId] = useState(null)

  // Fetch user's orders using React Query
  const { data: myOrders, isLoading, isError, refetch } = useMyOrders(currentUser?.email)

  const deleteOrderMutation = useDeleteOrder()

  // Handle order deletion with confirmation
  const handleDeleteOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      setDeletingOrderId(orderId)
      try {
        await deleteOrderMutation.mutateAsync({
          id: orderId,
          email: currentUser.email,
        })

        Swal.fire({
          title: "Deleted!",
          text: "Your order has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        })

        refetch() // Refresh orders list
      } catch (error) {
        console.error("Error deleting order:", error)
        Swal.fire({
          title: "Error!",
          text: "Failed to delete order. Please try again.",
          icon: "error",
        })
      } finally {
        setDeletingOrderId(null)
      }
    }
  }

  // Format date display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Format price display
  const formatPrice = (price) => {
    return `$${Number.parseFloat(price).toFixed(2)}`
  }

  // Calculate total price for an order
  const calculateTotal = (price, quantity) => {
    return formatPrice(price * quantity)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error loading your orders. Please try again later.</p>
          </div>
        )}

        {/* Orders list */}
        {!isLoading && !isError && (
          <>
            {myOrders && myOrders.length > 0 ? (
              <div className="space-y-6">
                {myOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-[var(--card-bg)] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Food image */}
                      <div className="lg:w-48 h-32 lg:h-48 overflow-hidden rounded-lg flex-shrink-0">
                        <img
                          src={order.foodDetails?.image || "/placeholder.svg"}
                          alt={order.foodName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Order details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">{order.foodName}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Order Date: {formatDate(order.buyingDate)}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Buyer: {order.buyerName}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email: {order.buyerEmail}</p>
                          </div>

                          {/* Order summary */}
                          <div className="mt-4 sm:mt-0 sm:text-right">
                            <p className="text-lg font-semibold text-[var(--text-color)] mb-1">
                              Quantity: {order.quantity}
                            </p>
                            <p className="text-lg font-semibold text-[var(--text-color)] mb-1">
                              Unit Price: {formatPrice(order.price)}
                            </p>
                            <p className="text-xl font-bold text-green-600">
                              Total: {calculateTotal(order.price, order.quantity)}
                            </p>
                          </div>
                        </div>

                        {/* Food description if available */}
                        {order.foodDetails?.description?.shortDescription && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {order.foodDetails.description.shortDescription}
                          </p>
                        )}

                        {/* Delete button */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            disabled={deletingOrderId === order._id}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingOrderId === order._id ? "Deleting..." : "Delete Order"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty state
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[var(--text-color)] mb-2">No orders yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You haven't placed any orders yet. Browse our food items to get started!
                </p>
                <button
                  onClick={() => (window.location.href = "/all-foods")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Browse Foods
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MyOrders
