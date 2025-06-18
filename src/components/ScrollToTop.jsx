"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Component to scroll to top when route changes
const ScrollToTop = () => {
  const { pathname } = useLocation()

  // Scroll to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
