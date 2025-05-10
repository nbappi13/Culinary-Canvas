"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import lottieAnimation from "../../assets/lottie/animation.json";
import image1 from "../../assets/slide/slider1.jpg";
import image2 from "../../assets/slide/slider2.jpg";
import image3 from "../../assets/slide/slider3.jpg";
import image4 from "../../assets/slide/slider4.jpg";
import image5 from "../../assets/slide/slider5.jpg";
import "../../styles/Banner.css";

const images = [image1, image2, image3, image4, image5];

const textVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 1.5,
      type: "spring",
      stiffness: 50,
    },
  },
};

const waveVariants = {
  animate: {
    x: [0, 20, -20, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

 
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); 
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="banner-container">
      
      <div className="slider-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{ backgroundImage: `url(${images[currentSlide]})` }}
          />
        </AnimatePresence>
        <div className="slide-overlay"></div>
      </div>

     
      <button className="slider-arrow slider-arrow-left" onClick={prevSlide}>
        <ChevronLeft size={36} />
      </button>
      <button className="slider-arrow slider-arrow-right" onClick={nextSlide}>
        <ChevronRight size={36} />
      </button>

    
      <div className="banner-content-wrapper">
        <motion.div
          className="banner-text"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={waveVariants} animate="animate">
            Welcome to Culinary Canvas
          </motion.h1>
          <div className="lottie-text-container">
            <Lottie
              animationData={lottieAnimation}
              className="lottie-animation"
            />
            <p className="banner-subtitle">Experience the best dining</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
