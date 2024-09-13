'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // To handle submission state
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    try {
      const req = await fetch('/api/users/reset-password', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,  // Token from URL params
          password: newPassword,  // New password input
        }),
      });

      const data = await req.json();

      if (req.ok) {
        setSuccess(data.message || 'Password has been successfully reset.');
        // Redirect to sign-in after 3 seconds
        setTimeout(() => {
          router.push('/sign-in');
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold">Reset Password</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="new-password" className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="input input-bordered w-full"
                placeholder="New Password"
                disabled={isSubmitting}  // Disable input during submission
              />
            </div>
            <div className="form-control">
              <label htmlFor="confirm-password" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input input-bordered w-full"
                placeholder="Confirm Password"
                disabled={isSubmitting}  // Disable input during submission
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}  // Disable button during submission
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
