import React, { useState } from 'react';
import { Car, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError('Email is required.');
      setMessage('');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setMessage('');
      return;
    }

    setError('');
    setMessage('If an account exists for this email, a password reset link will be sent.');
    console.log('Password reset request submitted for:', email);
  };

  return (
    <div className="py-14 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 px-4">
      <div className="text-center mb-6">
        <div className="text-white text-3xl font-bold flex justify-center items-center gap-2">
          <Car className='w-10 h-10' /> <span>AutoRent</span>
        </div>
      </div>

      <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-lg p-8 pt-5">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email and we will help you reset your password.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError('');
                  setMessage('');
                }}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          {message && (
            <p className="mb-4 text-sm text-green-700 bg-green-100 border border-green-200 rounded-md px-3 py-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
