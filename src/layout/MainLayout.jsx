"use client"

import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"
import { useTheme } from "../context/ThemeProvider"
import Banner from "../components/Banner/Banner"
import ScrollToTop from "../components/ScrollToTop"

const MainLayout = () => {
  const { theme } = useTheme()
  const location = useLocation()

  // Check if current page is home page
  const isHomePage = location.pathname === "/"

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      {/* Auto scroll to top on route change */}
      <ScrollToTop />

      {/* Fixed navigation bar */}
      <Navbar />

      {/* Show banner only on home page */}
      {isHomePage && <Banner />}

      {/* Main content area with top padding for fixed navbar */}
      <div className="max-w-7xl mx-auto pt-20">
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  )
}

export default MainLayout
