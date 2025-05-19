"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeProvider"; 

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme(); 

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`py-16 px-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-slate-300 text-gray-800"
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">Customer Reviews</h2>
        <p
          className={`text-center text-lg max-w-xl mx-auto mb-10 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          What our customers are saying...
        </p>

        <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
          <motion.div
            className="flex transition-transform duration-600 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                className={`w-full flex-shrink-0 p-6 md:p-8 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } rounded-xl shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
             
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    loading="lazy"
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold">{review.name}</h3>
                    <div className="flex gap-1 text-yellow-500 text-lg">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {review.date}
                    </p>
                  </div>
                </div>

               
                <div
                  className={`italic ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  "{review.text}"
                </div>
              </motion.div>
            ))}
          </motion.div>

         
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to review ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-blue-600 scale-125"
                    : theme === "dark"
                    ? "bg-gray-600"
                    : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>

         
          <button
            onClick={() =>
              setActiveIndex(
                (current) => (current - 1 + reviews.length) % reviews.length
              )
            }
            aria-label="Previous review"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-blue-700 transition"
          >
            ‹
          </button>
          <button
            onClick={() =>
              setActiveIndex((current) => (current + 1) % reviews.length)
            }
            aria-label="Next review"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-blue-700 transition"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};


const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://imgur.com/zWneJuQ.jpg ",
    rating: 5,
    text: "The flavors were absolutely divine! Every bite was a new adventure. I can't wait to come back and try more dishes.",
    date: "October 15, 2023",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://imgur.com/FPTDEwg.jpg ",
    rating: 5,
    text: "Impeccable service and atmosphere. The chef's special was a revelation - truly the best dining experience I've had this year.",
    date: "November 3, 2023",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://imgur.com/skBApK7.jpg ",
    rating: 4,
    text: "Perfect place for our anniversary dinner. The attention to detail in both food presentation and taste was remarkable.",
    date: "December 12, 2023",
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "https://imgur.com/KvUvUM7.jpg ",
    rating: 5,
    text: "As a food critic, I rarely give perfect scores, but Culinary Canvas deserves nothing less. Their fusion dishes are innovative yet authentic.",
    date: "January 8, 2024",
  },
  {
    id: 5,
    name: "Sophia Patel",
    avatar: "https://imgur.com/SecS239.jpg ",
    rating: 5,
    text: "The dessert menu alone is worth the visit! Brought my family from out of town and they're still talking about the experience.",
    date: "February 20, 2024",
  },
];

export default CustomerReviews;