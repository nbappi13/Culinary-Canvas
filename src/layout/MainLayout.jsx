"use client"
import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"
import { useTheme } from "../context/ThemeProvider"

const MainLayout = () => {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto" style={{ paddingTop: "80px" }}>
        
        <main className="p-4">
          <Outlet />
        </main>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
