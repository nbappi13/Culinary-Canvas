"use client";

import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const BookNow = () => {
  // State for form data and loading status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
  });
  const [loading, setLoading] = useState(false);
  const [previousBooking, setPreviousBooking] = useState(null);
  
  // Get user data from context
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!token || !currentUser) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to make a booking.",
        confirmButtonText: "Go to Login",
      }).then(() => navigate("/login"));
      return;
    }

    // Check for duplicate booking
    const bookingData = JSON.stringify(formData);
    if (bookingData === previousBooking) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have already confirmed this booking!",
      });
      return;
    }

    try {
      setLoading(true);
      // Send booking data to server
      const response = await fetch(
        "https://b10-a11-server-side-chi.vercel.app/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save booking");
      }

      // Show success message
      toast.success("Booking confirmed!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        date: "",
        time: "",
        guests: "",
      });
      setPreviousBooking(bookingData);
    } catch (error) {
      console.error("Booking error:", error.message);

      // Handle expired token
      if (error.message.includes("Invalid token")) {
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: "Your session has expired. Please log in again.",
          confirmButtonText: "Go to Login",
        }).then(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
      } else {
        toast.error(`Booking failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill user data if logged in
  React.useEffect(() => {
    if (currentUser && currentUser.email) {
      setFormData((prev) => ({
        ...prev,
        email: currentUser.email,
        name: currentUser.displayName || currentUser.name || "",
      }));
    }
  }, [currentUser]);

  return (
    // Background container
    <div
      className="book-now-container flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/src/assets/private_dining.jpg')` }}
    >
      {/* Booking form */}
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Book Your Private Dining Experience
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          
          {/* Email input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          
          {/* Date input */}
          <div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          
          {/* Time input */}
          <div>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          
          {/* Guests input */}
          <div>
            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookNow;