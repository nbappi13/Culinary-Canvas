"use client"

import { createContext, useState, useEffect, useContext } from "react"

const ThemeContext = createContext()

// Theme provider component for managing light/dark theme
export const ThemeProvider = ({ children }) => {
  // Get theme from localStorage or default to light
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  // Apply theme to document and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext)
