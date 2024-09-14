'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { permanentRedirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility
  const [showSuccessToast, setShowSuccessToast] = useState(false); // State for showing success toast
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      const tokenExpiry = localStorage.getItem('token-expiry');

      if (!token || !tokenExpiry) return;

      const currentTime = Math.floor(Date.now() / 1000);
      const expiryTime = parseInt(tokenExpiry, 10);

      // If the token is about to expire in 5 minutes or less
      if (expiryTime - currentTime <= 300) {
        try {
          const response = await axios.post('/api/users/refresh-token', {}, { withCredentials: true });
          const { refreshedToken, exp } = response.data;

          // Update localStorage with the new token and expiry time
          localStorage.setItem('token', refreshedToken);
          localStorage.setItem('token-expiry', exp);
        } catch (error) {
          console.log('Failed to refresh token:', error);
        }
      } else {
        revalidateTag('username'); // Update all references to the username
        permanentRedirect(`/settings/profile`);
      }
    };

    checkToken();
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/users/login', { email, password });
      const { token, exp } = response.data;

      // Store token and expiration time
      localStorage.setItem('token', token);
      localStorage.setItem('token-expiry', exp);

      // Set success toast to be visible
      setShowSuccessToast(true);

      // Redirect to profile page or dashboard
      setTimeout(() => {
        router.push('/settings/profile');
      }, 2000); // Delay redirect to show the toast
    } catch (error) {
      if (error.response?.data?.errors?.length) {
        setError(error.response.data.errors[0].message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold">Sign In</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {showSuccessToast && (
            <div className="toast toast-bottom toast-end rounded-none">
              <div className="alert alert-success rounded-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Logged in successfully.</span>
              </div>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full"
                placeholder="Email Address"
              />
            </div>
            <div className="form-control relative">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full pr-10" // Added padding-right for icon
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
              <label className="label">
                <a href="/forgot-password" className="label-text-alt link link-hover">
                  Forgot your password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="label-text ml-2">Remember me</span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{' '}
              <a href="/sign-up" className="text-primary font-medium">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
