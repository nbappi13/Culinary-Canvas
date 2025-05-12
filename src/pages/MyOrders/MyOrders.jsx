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
      <div
        className="my-orders-page"
        style={{
          padding: "1rem",
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>My Orders</h1>

        {orders?.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              fontSize: "1rem",
              color: "#777",
              backgroundColor: "var(--card-bg)",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            No orders found.
          </div>
        ) : (
          orders?.map((order) => (
            <div
              key={order._id}
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--text-color)",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                <img
                  src={order.foodDetails.image || "/placeholder.svg"}
                  alt={order.foodDetails.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginRight: "0.75rem",
                  }}
                />
                <div>
                  <h3 style={{ margin: "0", fontSize: "1.1rem" }}>{order.foodDetails.name}</h3>
                  <p style={{ margin: "0", fontSize: "1rem", fontWeight: "bold" }}>${order.price.toFixed(2)}</p>
                </div>
              </div>

              <div style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                <p style={{ margin: "0.25rem 0" }}>
                  <strong>Buyer:</strong> {order.buyerName}
                </p>
                <p style={{ margin: "0.25rem 0" }}>
                  <strong>Date:</strong> {moment(order.buyingDate).format("MMM Do YYYY")}
                </p>
              </div>

              <button
                onClick={() => handleDelete(order._id)}
                disabled={isDeleting}
                style={{
                  backgroundColor: "var(--button-bg)",
                  color: "var(--button-text)",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  width: "100%",
                  marginTop: "0.5rem",
                }}
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
    <div
      className="my-orders-page"
      style={{
        padding: "2rem",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <h1>My Orders</h1>
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "var(--card-bg)",
            color: "var(--text-color)",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "1rem",
                  border: "1px solid #ddd",
                  backgroundColor: "var(--navbar-bg)",
                  color: "var(--navbar-text)",
                }}
              >
                Image
              </th>
              <th
                style={{
                  padding: "1rem",
                  border: "1px solid #ddd",
                  backgroundColor: "var(--navbar-bg)",
                  color: "var(--navbar-text)",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "1rem",
                  border: "1px solid #ddd",
                  backgroundColor: "var(--navbar-bg)",
                  color: "var(--navbar-text)",
                }}
              >
                Price
              </th>
              <th
                style={{
                  padding: "1rem",
                  border: "1px solid #ddd",
                  backgroundColor: "var(--navbar-bg)",
                  color: "var(--navbar-text)",
                }}
              >
                Buyer Name
              </th>
              <th
                style={{
                  padding: "1rem",
                  border: "1px solid #ddd",
                  backgroundColor: "var(--navbar-bg)",
                  color: "var(--navbar-text)",
                }}
              >
                Buying Date
              </th>
              <th
                style={{
                  padding: "1rem",
                  border: "1px solid #ddd",
                  backgroundColor: "var(--navbar-bg)",
                  color: "var(--navbar-text)",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    fontSize: "1.2rem",
                    color: "#777",
                    border: "1px solid #ddd",
                  }}
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders?.map((order) => (
                <tr key={order._id}>
                  <td style={{ padding: "1rem", border: "1px solid #ddd" }}>
                    <img
                      src={order.foodDetails.image || "/placeholder.svg"}
                      alt={order.foodDetails.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td style={{ padding: "1rem", border: "1px solid #ddd" }}>{order.foodDetails.name}</td>
                  <td style={{ padding: "1rem", border: "1px solid #ddd" }}>${order.price.toFixed(2)}</td>
                  <td style={{ padding: "1rem", border: "1px solid #ddd" }}>{order.buyerName}</td>
                  <td style={{ padding: "1rem", border: "1px solid #ddd" }}>
                    {moment(order.buyingDate).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td style={{ padding: "1rem", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleDelete(order._id)}
                      disabled={isDeleting}
                      style={{
                        backgroundColor: "var(--button-bg)",
                        color: "var(--button-text)",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
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
