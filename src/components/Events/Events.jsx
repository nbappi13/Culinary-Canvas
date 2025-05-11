"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import "../../styles/Events.css"

const eventsList = [
  {
    id: 1,
    title: "Wedding Receptions",
    description: "Create unforgettable memories with our elegant wedding reception packages. Our culinary team crafts personalized menus that reflect your unique taste.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    capacity: "50-200 guests"
  },
  {
    id: 2,
    title: "Corporate Gatherings",
    description: "Impress your clients and colleagues with our sophisticated corporate event spaces. Perfect for meetings, conferences, and team celebrations.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
    capacity: "20-100 guests"
  },
  {
    id: 3,
    title: "Birthday Celebrations",
    description: "Make your special day extraordinary with our birthday packages. From intimate gatherings to lavish parties, we cater to all your needs.",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=2069",
    capacity: "10-50 guests"
  },
  {
    id: 4,
    title: "Seasonal Festivities",
    description: "Celebrate holidays and seasonal events with our festive menus and decorated spaces. Perfect for Thanksgiving, Christmas, and New Year gatherings.",
    image: "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?q=80&w=2070",
    capacity: "30-150 guests"
  }
]

const Events = () => {
  const [activeEvent, setActiveEvent] = useState(eventsList[0])
  const navigate = useNavigate()

  const handleContactClick = () => {
    navigate("/contact")
  }

  return (
    <section className="events-section">
      <div className="events-container">
        <h2 className="events-title">Special Events</h2>
        <p className="events-subtitle">Create unforgettable moments with our exceptional event hosting</p>
        
        <div className="events-content">
          <div className="events-tabs">
            {eventsList.map((event) => (
              <button
                key={event.id}
                className={`event-tab ${activeEvent.id === event.id ? "active" : ""}`}
                onClick={() => setActiveEvent(event)}
              >
                {event.title}
              </button>
            ))}
          </div>
          
          <motion.div 
            className="event-details"
            key={activeEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="event-image-container">
              <img src={activeEvent.image || "/placeholder.svg"} alt={activeEvent.title} className="event-image" />
              <div className="event-capacity">
                <span>{activeEvent.capacity}</span>
              </div>
            </div>
            <div className="event-info">
              <h3 className="event-title">{activeEvent.title}</h3>
              <p className="event-description">{activeEvent.description}</p>
              <button onClick={handleContactClick} className="event-contact-btn">
                Contact Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Events