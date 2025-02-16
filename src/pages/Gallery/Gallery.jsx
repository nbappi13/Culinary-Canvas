import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../../styles/Gallery.css";
import { useTheme } from "../../context/ThemeProvider";
import { Zoom } from "react-awesome-reveal";

const initialImages = [
  { src: "/src/assets/image1.jpg", alt: "Image 1" },
  { src: "/src/assets/image2.jpg", alt: "Image 2" },
  { src: "/src/assets/image3.jpg", alt: "Image 3" },
  { src: "/src/assets/image4.jpg", alt: "Image 4" },
  { src: "/src/assets/image5.jpg", alt: "Image 5" },
  { src: "/src/assets/image6.jpg", alt: "Image 6" },
  { src: "/src/assets/image7.jpg", alt: "Image 7" },
  { src: "/src/assets/image8.jpg", alt: "Image 8" },
  { src: "/src/assets/image9.jpg", alt: "Image 9" },
  { src: "/src/assets/image10.jpg", alt: "Image 10" },
  { src: "/src/assets/image11.jpg", alt: "Image 11" },
  { src: "/src/assets/image12.jpg", alt: "Image 12" },
];

const additionalImages = [
  { src: "/src/assets/image13.jpg", alt: "Image 13" },
  { src: "/src/assets/image14.jpg", alt: "Image 14" },
  { src: "/src/assets/image15.jpg", alt: "Image 15" },
  { src: "/src/assets/image16.jpg", alt: "Image 16" },
  { src: "/src/assets/image17.jpg", alt: "Image 17" },
  { src: "/src/assets/image18.jpg", alt: "Image 18" },
  { src: "/src/assets/image19.jpg", alt: "Image 19" },
  { src: "/src/assets/image20.jpg", alt: "Image 20" },
  { src: "/src/assets/image21.jpg", alt: "Image 21" },
  { src: "/src/assets/image22.jpg", alt: "Image 22" },
  { src: "/src/assets/image23.jpg", alt: "Image 23" },
  { src: "/src/assets/image3.jpg", alt: "Image 3" },
  { src: "/src/assets/image9.jpg", alt: "Image 9" },
  { src: "/src/assets/image10.jpg", alt: "Image 10" },
  { src: "/src/assets/image11.jpg", alt: "Image 11" },
  { src: "/src/assets/image12.jpg", alt: "Image 12" },
  { src: "/src/assets/image4.jpg", alt: "Image 4" },
  { src: "/src/assets/image5.jpg", alt: "Image 5" },
  { src: "/src/assets/image6.jpg", alt: "Image 6" },
  { src: "/src/assets/image7.jpg", alt: "Image 7" },
  { src: "/src/assets/image8.jpg", alt: "Image 8" },
  { src: "/src/assets/image1.jpg", alt: "Image 1" },
  { src: "/src/assets/image2.jpg", alt: "Image 2" },
];

const Gallery = () => {
  const { theme } = useTheme();
  const [images, setImages] = useState(initialImages);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const loadMoreImages = () => {
    setImages((prevImages) => [...prevImages, ...additionalImages]);
  };

  const handleImageClick = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        loadMoreImages();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`gallery-page ${theme}`}>
      <h1 className="gallery-title">Gallery</h1>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <Zoom key={index}>
            <div
              className="gallery-item"
              onClick={() => handleImageClick(index)}
            >
              <img src={image.src} alt={image.alt} className="gallery-image" />
            </div>
          </Zoom>
        ))}
      </div>
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={images}
          index={currentImage}
        />
      )}
    </div>
  );
};

export default Gallery;