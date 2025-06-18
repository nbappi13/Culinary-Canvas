"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthProvider"
import { Link, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import { useTheme } from "../../context/ThemeProvider"
import restaurant_logo from "../../assets/restaurant_logo.png"

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const location = useLocation()

  // Close dropdowns when route changes
  useEffect(() => {
    setDropdownOpen(false)
    setMobileMenuOpen(false)
  }, [location])

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 320)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Handle user logout with confirmation
  const handleLogout = async () => {
    try {
      await logout()
      Swal.fire({
        title: "Logout Successful!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("Logout error:", error)
      Swal.fire({
        title: "Logout Failed!",
        text: "An error occurred while logging out.",
        icon: "error",
      })
    }
  }

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path
  }

  // Handle home click with smooth scroll
  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div
      className="navbar w-full"
      style={{
        backgroundColor: theme === "dark" ? "#1f2937" : "#4f46e5",
        color: theme === "dark" ? "#f9fafb" : "#ffffff",
        transition: "background-color 0.3s, color 0.3s",
        position: "fixed",
        top: 0,
        zIndex: 50,
        width: "100%",
      }}
    >
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[100] mt-3 w-52 p-2 shadow"
              style={{
                backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                color: theme === "dark" ? "#f9fafb" : "#000000",
              }}
            >
              <li className={isActive("/") ? "active" : ""}>
                <Link
                  to="/"
                  style={{ color: "inherit" }}
                  onClick={(e) => {
                    handleHomeClick(e)
                    setMobileMenuOpen(false)
                  }}
                >
                  Home
                </Link>
              </li>
              <li className={isActive("/all-foods") ? "active" : ""}>
                <Link to="/all-foods" style={{ color: "inherit" }} onClick={() => setMobileMenuOpen(false)}>
                  All Foods
                </Link>
              </li>
              <li className={isActive("/events") ? "active" : ""}>
                <Link to="/events" style={{ color: "inherit" }} onClick={() => setMobileMenuOpen(false)}>
                  Events
                </Link>
              </li>
              <li className={isActive("/contact") ? "active" : ""}>
                <Link to="/contact" style={{ color: "inherit" }} onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
              </li>
              <li className={isActive("/reviews") ? "active" : ""}>
                <Link to="/reviews" style={{ color: "inherit" }} onClick={() => setMobileMenuOpen(false)}>
                  Reviews
                </Link>
              </li>
              <li className={isActive("/gallery") ? "active" : ""}>
                <Link to="/gallery" style={{ color: "inherit" }} onClick={() => setMobileMenuOpen(false)}>
                  Gallery
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold" style={{ color: "inherit" }}>
          <img
            src={restaurant_logo || "/placeholder.svg"}
            alt="Logo"
            className="h-14 w-14 rounded-full"
            loading="lazy"
          />
          <span className="text-2xl">Culinary Canvas</span>
        </Link>
      </div>

      {/* Desktop navigation menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-1xl font-bold">
          <li className={isActive("/") ? "active" : ""}>
            <Link to="/" style={{ color: "inherit" }} onClick={handleHomeClick}>
              Home
            </Link>
          </li>
          <li className={isActive("/all-foods") ? "active" : ""}>
            <Link to="/all-foods" style={{ color: "inherit" }}>
              All Foods
            </Link>
          </li>
          <li className={isActive("/events") ? "active" : ""}>
            <Link to="/events" style={{ color: "inherit" }}>
              Events
            </Link>
          </li>
          <li className={isActive("/reviews") ? "active" : ""}>
            <Link to="/reviews" style={{ color: "inherit" }}>
              Reviews
            </Link>
          </li>
          <li className={isActive("/gallery") ? "active" : ""}>
            <Link to="/gallery" style={{ color: "inherit" }}>
              Gallery
            </Link>
          </li>
        </ul>
      </div>

      {/* Right side of navbar */}
      <div className="navbar-end flex items-center" style={isSmallScreen ? { gap: "0.25rem" } : { gap: "1rem" }}>
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost"
          style={isSmallScreen ? { padding: "0.25rem", minHeight: "unset", height: "auto" } : {}}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.354a8 8 0 000 15.292 8 8 0 000-15.292zM12 2a10 10 0 110 20 10 10 0 010-20zm0 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.354a8 8 0 000 15.292 8 8 0 000-15.292zM12 2a10 10 0 110 20 10 10 0 010-20zm0 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z" />
            </svg>
          )}
        </button>
        {/* User authentication section */}
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={toggleDropdown}>
              <div className="w-10 rounded-full">
                <img src={currentUser.photoURL || "https://via.placeholder.com/150"} alt="Profile" loading="lazy" />
              </div>
            </label>
            {/* User dropdown menu */}
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content rounded-box w-52"
                style={{
                  backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                  color: theme === "dark" ? "#f9fafb" : "#000000",
                  zIndex: 1000,
                  position: "absolute",
                }}
              >
                <li className="font-bold text-center">{currentUser.displayName || "User"}</li>
                <li>
                  <Link to="/my-foods" style={{ color: "inherit" }} onClick={() => setDropdownOpen(false)}>
                    My Foods
                  </Link>
                </li>
                <li>
                  <Link to="/add-food" style={{ color: "inherit" }} onClick={() => setDropdownOpen(false)}>
                    Add Food
                  </Link>
                </li>
                <li>
                  <Link to="/my-orders" style={{ color: "inherit" }} onClick={() => setDropdownOpen(false)}>
                    My Orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setDropdownOpen(false)
                      handleLogout()
                    }}
                    className="btn btn-error w-full"
                    style={{ color: "inherit" }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
