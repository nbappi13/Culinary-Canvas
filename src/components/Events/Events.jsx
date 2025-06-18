"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";

// List of available events
const eventsList = [
  {
    id: 1,
    title: "Wedding Receptions",
    description:
      "Create unforgettable memories with our elegant wedding reception packages. Our culinary team crafts personalized menus that reflect your unique taste.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070 ",
    capacity: "50-200 guests",
  },
  // ... other events
];

const Events = () => {
  // State for currently selected event
  const [activeEvent, setActiveEvent] = useState(eventsList[0]);
  const navigate = useNavigate();
  const { theme } = useTheme(); 

  // Navigate to contact page
  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    // Main section with theme colors
    <section
      className={`py-20 px-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-zinc-200 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <h2 className="text-4xl font-bold text-center mb-2">Special Events</h2>
        <p
          className={`text-center text-lg max-w-xl mx-auto mb-10 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Create unforgettable moments with our exceptional event hosting
        </p>

        <div className="flex flex-col items-center gap-6">
          {/* Event type buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {eventsList.map((event) => (
              <button
                key={event.id}
                onClick={() => setActiveEvent(event)}
                className={`px-5 py-3 rounded-full border-2 font-semibold transition-all ${
                  activeEvent.id === event.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : theme === "dark"
                    ? "border-blue-500 text-blue-400 hover:bg-gray-800"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {event.title}
              </button>
            ))}
          </div>

          {/* Animated event details card */}
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full overflow-hidden rounded-xl shadow-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Event image with capacity label */}
            <div className="relative w-full h-72 md:h-80 lg:h-96">
              <img
                src={activeEvent.image || "/placeholder.svg"}
                alt={activeEvent.title}
                loading="lazy"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-5 right-5 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {activeEvent.capacity}
              </div>
            </div>

            {/* Event description and contact button */}
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-3">{activeEvent.title}</h3>
              <p
                className={`mb-6 leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {activeEvent.description}
              </p>
              <button
                onClick={handleContactClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                Contact Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Events;