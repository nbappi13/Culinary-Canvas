import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../../assets/slide/slider1.jpg';
import image2 from '../../assets/slide/slider2.jpg';
import image3 from '../../assets/slide/slider3.jpg';
import image4 from '../../assets/slide/slider4.jpg';
import image5 from '../../assets/slide/slider5.jpg';

const images = [image1, image2, image3, image4, image5];

const textVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 1.5,
      type: 'spring',
      stiffness: 50,
    },
  },
};

const waveVariants = {
  animate: {
    x: [0, 20, -20, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="banner-container"
    >
      <motion.div
        className="banner-text"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={waveVariants}
          animate="animate"
        >
          Welcome to Culinary Canvas
        </motion.h1>
        <p>Experience the best dining</p>
      </motion.div>
      <div className="banner-content">
        <motion.div
          className="image-gallery"
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            duration: 15,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          {[...images, ...images].map((image, index) => (
            <motion.div
              key={index}
              className="image-wrapper"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
              }}
            >
              <img src={image} alt={`Banner ${index + 1}`} className="banner-image" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;