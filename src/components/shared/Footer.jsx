"use client"
import { useNavigate, useLocation } from "react-router-dom"
import { FaFacebook, FaInstagram} from "react-icons/fa"
import { FaX } from 'react-icons/fa6';

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      navigate("/")
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleAboutUsClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToOurStory: true } })
    } else {
      const ourStorySection = document.querySelector(".our-story-container")
      if (ourStorySection) {
        ourStorySection.scrollIntoView({ behavior: "smooth" })
        const readMoreButton = ourStorySection.querySelector(".read-more-button")
        if (readMoreButton) {
          readMoreButton.click()
        }
      }
    }
  }

  return (
    <footer className="w-full flex flex-col items-center bg-[#333] text-white p-5 dark:bg-gray-800 dark:text-gray-200">
      <div className="w-full flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2.5 sm:block hidden">
          <img src="/restaurant_logo.png" alt="Restaurant Logo" className="w-[60px] h-[60px]" loading="lazy" />
          <span className="text-xl font-bold">Culinary Canvas</span>
        </div>

        <div className="text-center">
          <span className="text-lg font-bold mb-2.5 mr-[100px] block">Navigation</span>
          <button
            className="block text-[#00bcd4] no-underline my-1.5 text-base hover:underline"
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button
            className="block text-[#00bcd4] no-underline my-1.5 text-base hover:underline"
            onClick={handleAboutUsClick}
          >
            About Us
          </button>
          <button
            className="block text-[#00bcd4] no-underline my-1.5 text-base hover:underline"
            onClick={() => navigate("/blog")}
          >
            Blog
          </button>
          <button
            className="block text-[#00bcd4] no-underline my-1.5 text-base hover:underline"
            onClick={() => navigate("/terms-of-use")}
          >
            Terms of Use
          </button>
          <button
            className="block text-[#00bcd4] no-underline my-1.5 text-base hover:underline"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-[15px]">
          <span className="text-lg font-bold mb-2.5 mr-[100px] block">Follow Us</span>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[#00bcd4] transition-colors duration-300 hover:text-white"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[#00bcd4] transition-colors duration-300 hover:text-white"
          >
            <FaX />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[#00bcd4] transition-colors duration-300 hover:text-white"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <hr className="border-0 border-t border-[#555] w-full my-4 dark:border-gray-500" />
      <p className="m-0 text-sm text-[#aaa] dark:text-gray-300">
        All rights reserved by Culinary Canvas © {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer
