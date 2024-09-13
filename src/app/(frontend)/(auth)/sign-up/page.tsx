'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // States for error messages
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Check if passwords match
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        setConfirmPasswordError(false);
        setConfirmPasswordMessage('');
      } else {
        setConfirmPasswordError(true);
        setConfirmPasswordMessage('Passwords do not match.');
      }
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    setPasswordError(false);
    setConfirmPasswordError(false);

    setLoading(true);
    try {
      // Sign up request
      await axios.post('/api/users', { name, email, password });

      // Hide the form and show a confirmation message
      setSubmitted(true);
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorMessage = error.response.data.errors[0]?.message;

        if (errorMessage.includes('email')) {
          setError('An account with this email already exists. Please check your inbox (including the spam folder) for a verification email. If you did not receive it, ensure your email address is correct or contact support.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-base-100">
        <div>
          {submitted ? (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
              <div className="max-w-md w-full p-6">
                <div className="text-center">
                  <h2 className="text-3xl font-semibold text-blue-700">Verification Email Sent</h2>
                  <p className="mt-4 text-gray-700">
                    We have sent a verification link to <span className="font-semibold text-blue-600">{email}</span>. Please check your inbox and spam folder. If you don't see the email, ensure the address is correct and try signing up again.
                  </p>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    If you need further assistance, feel free to <a href="/contact" className="text-blue-500 hover:underline">contact support</a>.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-center text-3xl font-bold">Create an Account</h2>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="name" className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input input-bordered w-full"
                    placeholder="Full Name"
                  />
                </div>
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
                    type={passwordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`input input-bordered w-full ${passwordError ? 'input-error' : ''}`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-12 right-0 pr-3 flex items-center"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      </div>
                    ) : (
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
                <div className="form-control relative">
                  <label htmlFor="confirm-password" className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`input input-bordered w-full ${confirmPasswordError ? 'input-error' : 'input-success'}`}
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  >
                    {confirmPasswordVisible ? (
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      </div>
                    ) : (
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
                {confirmPasswordMessage && (
                  <p className="text-error text-sm mt-2">{confirmPasswordMessage}</p>
                )}
                {error && <p className="text-error text-sm mt-2">{error}</p>}
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
