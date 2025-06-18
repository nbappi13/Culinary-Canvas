import React, { useState } from 'react';
import { loginWithEmailPassword, loginWithGoogle, loginWithGithub } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  // State for form inputs and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle email/password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginWithEmailPassword(email, password);
      // Show success message
      Swal.fire({
        title: 'Login Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/'); // Go to home page
    } catch (err) {
      setError(err.message); // Show error if login fails
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      Swal.fire({
        title: 'Login Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle GitHub login
  const handleGithubLogin = async () => {
    setError('');
    try {
      await loginWithGithub();
      Swal.fire({
        title: 'Login Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: 'url("/login.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Login form container */}
      <div className="max-w-md mx-auto my-10 p-6 bg-base-200 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        {/* Email/password login form */}
        <form onSubmit={handleEmailLogin}>
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
          
          {/* Password field with toggle */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Show/hide password toggle */}
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
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7a9.959 9.959 0 01-1.684 4.68M12 19c-4.478 0-8.268-2.943-9.542-7a9.959 9.959 0 011.684-4.68M12 5v.01M12 19v.01"
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
          
          {/* Show error if any */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        
        {/* Social login options */}
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogin} className="btn btn-outline btn-accent w-full mb-2">Login with Google</button>
        <button onClick={handleGithubLogin} className="btn btn-outline w-full">Login with GitHub</button>
        
        {/* Register link */}
        <p className="text-sm text-center mt-4">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;