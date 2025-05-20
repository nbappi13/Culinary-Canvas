"use client";

import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const BookNow = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
  });
  const [loading, setLoading] = useState(false);
  const [previousBooking, setPreviousBooking] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !currentUser) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to make a booking.",
        confirmButtonText: "Go to Login",
      }).then(() => navigate("/login"));
      return;
    }

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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save booking");
      }

      toast.success("Booking confirmed!");
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

      if (
        error.message.includes("Invalid token") ||
        error.message.includes("Access denied")
      ) {
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
    <div
      className="book-now-container flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/src/assets/private_dining.jpg')` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Book Your Private Dining Experience
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
