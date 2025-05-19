"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../assets/slide/slider1.webp";
import image2 from "../../assets/slide/slider2.webp";
import image3 from "../../assets/slide/slider3.webp";
import image4 from "../../assets/slide/slider4.webp";
import image5 from "../../assets/slide/slider5.webp";

const images = [image1, image2, image3, image4, image5];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); 

  const paginate = (newDirection) => {
    setDirection(newDirection);
    const nextSlide = (currentSlide + newDirection + images.length) % images.length;
    setCurrentSlide(nextSlide);
  };

 
  const transition = {
    type: "spring",
    stiffness: 250,
    damping: 25,
    mass: 0.5,
    restDelta: 0.001,
    bounce: 0,
  };

  const variants = {
    enter: (dir) => ({
      x: dir === 1 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
    },
    exit: (dir) => ({
      x: dir === 1 ? "-100%" : "100%",
    }),
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "calc(100vh - 32px)",
        willChange: "transform",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="relative w-full h-full">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.img
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            src={images[currentSlide]}
            loading="lazy"
            alt={`Slide ${currentSlide + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0,0,0)", 
            }}
          />
        </AnimatePresence>

      
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/30 z-10" />

       
        <button
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-full hover:bg-white/20 transition"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft size={32} className="text-white" />
        </button>

        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-full hover:bg-white/20 transition"
          onClick={() => paginate(1)}
        >
          <ChevronRight size={32} className="text-white" />
        </button>

      
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 text-center z-20">
          <motion.h1
            key={currentSlide + "-heading"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Welcome to Culinary Canvas
          </motion.h1>

          <motion.p
            key={currentSlide + "-subtext"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="text-white text-base sm:text-lg lg:text-xl italic text-opacity-70"
          >
            Experience the best dining
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Banner;