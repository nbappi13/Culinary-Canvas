"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../styles/CustomerReviews.css";


const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://imgur.com/zWneJuQ.jpg",
    rating: 5,
    text: "The flavors were absolutely divine! Every bite was a new adventure. I can't wait to come back and try more dishes.",
    date: "October 15, 2023",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://imgur.com/FPTDEwg.jpg",
    rating: 5,
    text: "Impeccable service and atmosphere. The chef's special was a revelation - truly the best dining experience I've had this year.",
    date: "November 3, 2023",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://imgur.com/skBApK7.jpg",
    rating: 4,
    text: "Perfect place for our anniversary dinner. The attention to detail in both food presentation and taste was remarkable.",
    date: "December 12, 2023",
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "https://imgur.com/KvUvUM7.jpg",
    rating: 5,
    text: "As a food critic, I rarely give perfect scores, but Culinary Canvas deserves nothing less. Their fusion dishes are innovative yet authentic.",
    date: "January 8, 2024",
  },
  {
    id: 5,
    name: "Sophia Patel",
    avatar: "https://imgur.com/SecS239.jpg",
    rating: 5,
    text: "The dessert menu alone is worth the visit! Brought my family from out of town and they're still talking about the experience.",
    date: "February 20, 2024",
  },
];

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <h2 className="reviews-title">Customer Reviews</h2>
        <p className="reviews-subtitle">
          Hear what our customers say about us!
        </p>

        <div className="reviews-carousel">
          <motion.div
            className="reviews-track"
            animate={{ x: `calc(-${activeIndex * 100}%)` }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            {reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-header">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    className="review-avatar"
                  />
                  <div className="review-meta">
                    <h3 className="review-name">{review.name}</h3>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`star ${
                            i < review.rating ? "filled" : ""
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="review-date">{review.date}</p>
                  </div>
                </div>
                <div className="review-content">
                  <p className="review-text">"{review.text}"</p>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="review-indicators">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`indicator ${activeIndex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="review-nav prev"
            onClick={() =>
              setActiveIndex(
                (current) => (current - 1 + reviews.length) % reviews.length
              )
            }
            aria-label="Previous review"
          >
            ‹
          </button>
          <button
            className="review-nav next"
            onClick={() =>
              setActiveIndex((current) => (current + 1) % reviews.length)
            }
            aria-label="Next review"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
