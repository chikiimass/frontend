'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/utils/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('token-expiry');
    
    if (isTokenExpired(token) || !tokenExpiry) {
      localStorage.removeItem('token');
      localStorage.removeItem('token-expiry');
      alert('Your session has expired. Please log in again.');
      router.push('/sign-in');
    }
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

      // Redirect to profile page or dashboard
      router.push('/profile');
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
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full"
                placeholder="Password"
              />
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
