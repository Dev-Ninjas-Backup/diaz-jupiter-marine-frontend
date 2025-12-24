'use client';

import React, { useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

interface LoginProps {
  onClose?: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      toast.error('Please enter your username');
      return;
    }
    if (!formData.password.trim()) {
      toast.error('Please enter your password');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Login successful!');
      setIsSubmitting(false);
      if (onClose) onClose();
    }, 1500);
  };

  const handleGoogleLogin = () => {
    toast.info('Google login coming soon!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-10">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
            <span className="text-blue-500 font-bold text-2xl">FYT</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="username"
                className="w-full px-4 py-3 pr-10 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <FaUser className="w-4 h-4 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="123******"
                className="w-full px-4 py-3 pr-10 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forget Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              Forget Password
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative px-4 bg-white">
              <span className="text-sm text-gray-500">or</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-700 mt-6">
          Don&apos;t have an account?{' '}
          <a
            href="#"
            className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
          >
            Register!
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
