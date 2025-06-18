"use client"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"

// Component to protect routes that need login
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext)
  const token = localStorage.getItem("token")

  // Show loading while checking auth
  if (loading) {
    return <div>Loading...</div>
  }

  // Redirect to login if not authenticated
  if (!currentUser || !token) {
    return <Navigate to="/login" />
  }

  // Show protected content if authenticated
  return children
}

export default PrivateRoute
