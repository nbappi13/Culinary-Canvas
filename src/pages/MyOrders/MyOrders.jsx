"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthProvider"
import { useMyOrders, useDeleteOrder } from "../../services/foodService"
import moment from "moment"

const MyOrders = () => {
  const { currentUser } = useAuth()
  const { data: orders, refetch } = useMyOrders(currentUser.email)
  const deleteOrderMutation = useDeleteOrder()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const handleDelete = async (orderId) => {
    setIsDeleting(true)
    try {
      await deleteOrderMutation.mutateAsync({ id: orderId, email: currentUser.email })
      refetch()
    } catch (error) {
      console.error("Error deleting order:", error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isMobile) {
    return (
      <div className="p-4 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
        <h1 className="text-2xl mb-4">My Orders</h1>

        {orders?.length === 0 ? (
          <div className="text-center p-4 text-base text-gray-500 bg-[var(--card-bg)] rounded-lg mb-4">
            No orders found.
          </div>
        ) : (
          orders?.map((order) => (
            <div
              key={order._id}
              className="bg-[var(--card-bg)] text-[var(--text-color)] border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
            >
              <div className="flex items-center mb-2">
                <img
                  src={order.foodDetails.image || "/placeholder.svg"}
                  alt={order.foodDetails.name}
                  className="w-[50px] h-[50px] object-cover rounded mr-3"
                  loading="lazy"
                />
                <div>
                  <h3 className="m-0 text-lg">{order.foodDetails.name}</h3>
                  <p className="m-0 text-base font-bold">${order.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="text-sm mb-2">
                <p className="my-1">
                  <strong>Buyer:</strong> {order.buyerName}
                </p>
                <p className="my-1">
                  <strong>Date:</strong> {moment(order.buyingDate).format("MMM Do YYYY")}
                </p>
              </div>

              <button
                onClick={() => handleDelete(order._id)}
                disabled={isDeleting}
                className="bg-[var(--button-bg)] text-[var(--button-text)] py-2 px-4 border-none rounded cursor-pointer transition-colors duration-200 hover:bg-[var(--button-hover-bg)] w-full mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Delete Order
              </button>
            </div>
          ))
        )}
      </div>
    )
  }

  return (
    <div className="p-8 md:p-6 sm:p-4 xs:p-2 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <h1 className="text-2xl mb-4 xs:text-xl">My Orders</h1>
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse bg-[var(--card-bg)] text-[var(--text-color)] transition-colors duration-300">
          <thead>
            <tr>
              <th className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 bg-[var(--navbar-bg)] text-[var(--navbar-text)]">
                Image
              </th>
              <th className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 bg-[var(--navbar-bg)] text-[var(--navbar-text)]">
                Name
              </th>
              <th className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 bg-[var(--navbar-bg)] text-[var(--navbar-text)]">
                Price
              </th>
              <th className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 bg-[var(--navbar-bg)] text-[var(--navbar-text)]">
                Buyer Name
              </th>
              <th className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 bg-[var(--navbar-bg)] text-[var(--navbar-text)]">
                Buying Date
              </th>
              <th className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 bg-[var(--navbar-bg)] text-[var(--navbar-text)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-lg text-gray-500 border border-gray-200">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders?.map((order) => (
                <tr key={order._id}>
                  <td className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200">
                    <img
                      src={order.foodDetails.image || "/placeholder.svg"}
                      alt={order.foodDetails.name}
                      className="w-[50px] h-[50px] object-cover sm:w-[40px] sm:h-[40px]"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 sm:text-sm">
                    {order.foodDetails.name}
                  </td>
                  <td className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 sm:text-sm">
                    ${order.price.toFixed(2)}
                  </td>
                  <td className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 sm:text-sm">
                    {order.buyerName}
                  </td>
                  <td className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200 sm:text-sm">
                    {moment(order.buyingDate).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td className="p-4 lg:p-3 md:p-2 sm:p-2 xs:p-1.5 border border-gray-200">
                    <button
                      onClick={() => handleDelete(order._id)}
                      disabled={isDeleting}
                      className="bg-[var(--button-bg)] text-[var(--button-text)] py-2 px-4 sm:py-1.5 sm:px-3 sm:text-sm border-none rounded cursor-pointer transition-colors duration-200 hover:bg-[var(--button-hover-bg)] disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrders
