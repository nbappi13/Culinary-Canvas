"use client"
import { useState } from "react"
import Swal from "sweetalert2"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const Contact = () => {
  const position = [23.7383, 90.3928]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

   
    const messages = JSON.parse(localStorage.getItem("messages")) || []
    messages.push(formData)
    localStorage.setItem("messages", JSON.stringify(messages))

    
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "We’ve received your message and will respond soon.",
      showConfirmButton: false,
      timer: 2000,
    })

   
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="pt-16 p-8 max-w-[800px] mx-auto font-sans text-[var(--text-color)] bg-[var(--bg-color)]">
      <h1 className="text-center text-4xl mb-4">Contact Us</h1>
      <p className="text-center text-base mb-8 text-[var(--text-secondary)]">
        Reach out to us for reservations, inquiries, or feedback. We'd love to hear from you!
      </p>

      <div className="mb-8 text-center">
        <div className="mb-2 text-base"><strong>Phone:</strong> +880 (2) 123-4567</div>
        <div className="mb-2 text-base"><strong>Email:</strong> info@culinarycanvas.com</div>
        <div className="mb-2 text-base"><strong>Address:</strong> Nilkhet, New Market, Dhaka, Bangladesh</div>
      </div>

      <div className="mb-8 rounded overflow-hidden shadow-md relative z-0">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }} className="z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Culinary Canvas <br /> Nilkhet, New Market, Dhaka
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-center text-2xl mb-4">Send Us a Message</h2>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm text-[var(--text-secondary)]">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-[var(--border-color,#ccc)] rounded-md text-base bg-[var(--input-bg,var(--bg-color))] text-[var(--text-color)]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm text-[var(--text-secondary)]">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-[var(--border-color,#ccc)] rounded-md text-base bg-[var(--input-bg,var(--bg-color))] text-[var(--text-color)]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="mb-2 text-sm text-[var(--text-secondary)]">Message</label>
          <textarea
            id="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="p-3 border border-[var(--border-color,#ccc)] rounded-md text-base bg-[var(--input-bg,var(--bg-color))] text-[var(--text-color)] resize-vertical"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="py-3 px-6 bg-[var(--button-bg)] text-[var(--button-text)] border-none rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-[var(--button-hover-bg)]"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact
