import React, { useState } from 'react';
import { loginWithEmailPassword, loginWithGoogle, loginWithGithub } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginWithEmailPassword(email, password);
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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
        <div className="mb-4 relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
      <div className="divider">OR</div>
      <button onClick={handleGoogleLogin} className="btn btn-outline btn-accent w-full mb-2">Login with Google</button>
      <button onClick={handleGithubLogin} className="btn btn-outline w-full">Login with GitHub</button>
      <p className="text-sm text-center mt-4">
        Don't have an account? <a href="/register" className="text-blue-500">Register</a>
      </p>
    </div>
  );
};

export default Login;