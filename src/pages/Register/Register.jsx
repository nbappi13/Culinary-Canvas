import React, { useState } from 'react';
import { registerWithEmailPassword } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Check if password meets requirements
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUpperCase) {
      return 'Password must have an uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must have a lowercase letter.';
    }
    if (!hasMinLength) {
      return 'Password must be at least 6 characters long.';
    }

    return null;
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Check password first
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      // Register user
      await registerWithEmailPassword(email, password);
      // Show success message
      Swal.fire({
        title: 'Registration Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/'); // Go to home page
    } catch (err) {
      setError(err.message); // Show error if registration fails
    }
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {/* Background image - visible on medium+ screens */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/register.png")',
        }}
      ></div>

      {/* Dark overlay - visible on medium+ screens */}
      <div className="hidden md:block absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Registration form */}
      <div className="relative max-w-lg w-4/5 transform -translate-x-10 md:translate-x-0 mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          {/* Name input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          {/* Email input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Password input with toggle */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Show/hide password button */}
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7a9.959 9.959 0 01-1.684 4.68M12 19c-4.478 0-8.268-2.943-9.542-7a9.959 9.959 0 011.684-4.68M15 12a3 3 0 01-6 0"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7a9.959 9.959 0 01-1.684 4.68M12 19c-4.478 0-8.268-2.943-9.542-7a9.959 9.959 0 011.684-4.68M12 5v.01M12 19v.01"
                  />
                </svg>
              )}
            </span>
          </div>
          
          {/* Optional photo URL input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Photo URL (optional)</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          
          {/* Show error if any */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>
        
        {/* Login link */}
        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;