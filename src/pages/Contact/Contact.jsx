"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "../../styles/Contact.css"

const Contact = () => {
  const position = [23.7383, 90.3928] 

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        Reach out to us for reservations, inquiries, or feedback. We'd love to hear from you!
      </p>

      <div className="contact-info">
        <div className="info-item">
          <strong>Phone:</strong> +880 (2) 123-4567
        </div>
        <div className="info-item">
          <strong>Email:</strong> info@culinarycanvas.com
        </div>
        <div className="info-item">
          <strong>Address:</strong> Nilkhet, New Market, Dhaka, Bangladesh
        </div>
      </div>

      <div className="map-container">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
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

      <form className="contact-form">
        <h2>Send Us a Message</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="4" placeholder="Your Message"></textarea>
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  )
}

export default Contact