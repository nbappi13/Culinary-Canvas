"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase/firebase.config"

export const AuthContext = createContext()

// Authentication context provider for the whole app
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Handle user logout
  const logout = async () => {
    try {
      await auth.signOut()
      localStorage.removeItem("token")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return <AuthContext.Provider value={{ currentUser, loading, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
