import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/BookNow.css';

const BookNow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: ''
  });

  const [previousBooking, setPreviousBooking] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = JSON.stringify(formData);
    if (bookingData === previousBooking) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have already confirmed this booking!',
      });
    } else {
      localStorage.setItem('bookingData', bookingData);
      toast.success('Booking confirmed!');
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: ''
      });
      setPreviousBooking(bookingData);
    }
  };

  return (
    <div className="book-now-container flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/src/assets/private_dining.jpg')` }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="book-now-title text-4xl font-bold mb-6 text-center">Book Your Private Dining Experience</h2>
        <form className="book-now-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="input input-bordered w-full" />
          </div>
          <div className="mb-4">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input input-bordered w-full" />
          </div>
          <div className="mb-4">
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="input input-bordered w-full" />
          </div>
          <div className="mb-4">
            <input type="time" name="time" value={formData.time} onChange={handleChange} required className="input input-bordered w-full" />
          </div>
          <div className="mb-6">
            <input type="number" name="guests" placeholder="Number of Guests" value={formData.guests} onChange={handleChange} required className="input input-bordered w-full" />
          </div>
          <button type="submit" className="btn btn-primary w-full">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookNow;