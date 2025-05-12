import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAboutUsClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToOurStory: true } });
    } else {
      const ourStorySection = document.querySelector(".our-story-container");
      if (ourStorySection) {
        ourStorySection.scrollIntoView({ behavior: "smooth" });
        const readMoreButton =
          ourStorySection.querySelector(".read-more-button");
        if (readMoreButton) {
          readMoreButton.click();
        }
      }
    }
  };

  return (
    <footer className="footer w-full p-10 bg-neutral text-neutral-content dark:bg-gray-800 dark:text-gray-200 flex flex-col items-center">
      <div className="footer-content w-full flex justify-between items-center">
        <div className="logo-container flex items-center sm:block hidden">
          <img
            src="/restaurant_logo.png"
            alt="Restaurant Logo"
            className="w-20 h-20 mr-4"
          />
          <span className="text-xl font-bold">Culinary Canvas</span>
        </div>

        <div className="nav-links flex flex-col items-center ">
          <span className="footer-title mb-2">Navigation</span>
          <button className="link link-hover" onClick={handleHomeClick}>
            Home
          </button>
          <button className="link link-hover" onClick={handleAboutUsClick}>
            About Us
          </button>
          <button className="link link-hover" onClick={() => navigate("/blog")}>
            Blog
          </button>
          <button
            className="link link-hover"
            onClick={() => navigate("/terms-of-use")}
          >
            Terms of Use
          </button>
          <button
            className="link link-hover"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
        </div>

        <div className="social-links flex flex-col items-center space-y-4">
          <span className="footer-title mb-2">Follow Us</span>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <hr className="w-full border-gray-600 my-4 dark:border-gray-500" />
      <p className="text-center text-sm text-gray-400 dark:text-gray-300">
        All rights reserved by Culinary Canvas © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
