'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

const Verify = () => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);  // Added loading state
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('No token provided in the URL.');
        setIsLoading(false);  // Stop loading if no token
        return;
      }

      try {
        const response = await axios.post(`/api/users/verify/${token}`);

        // Check if the response contains the expected success message
        if (response.data.message) {
          setStatus(response.data.message);
          setIsLoading(false);  // Stop loading when done

          if (response.data.message.toLowerCase().includes('success')) {
            // Redirect to login after 3 seconds
            setTimeout(() => {
              router.push('/sign-in');
            }, 3000);
          }
        } else {
          setError('Unexpected response from the server.');
          setIsLoading(false);
        }
      } catch (err) {
        // Handle errors from the API and display the exact message from the server
        if (err.response && err.response.data && err.response.data.message) {
          setError(`${err.response.data.message}. Please contact the admin.`);
        } else {
          setError('Failed to verify email. Please contact the admin.');
        }
        setIsLoading(false);  // Stop loading on error
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md bg-base-100">
        <div className="card-body text-center">
          {isLoading ? (  // Show while loading
            <>
              <h2 className="text-2xl font-bold">Verifying...</h2>
              <p className="mt-4">Please wait while we verify your email.</p>
            </>
          ) : status ? (  // Show on success
            <>
              <h2 className="text-2xl font-bold text-success">Success!</h2>
              <p className="mt-4">{status}</p>
              <p className="mt-4">Redirecting to sign-in page...</p>
            </>
          ) : (  // Show on error
            <>
              <h2 className="text-2xl font-bold text-error">Verification Error</h2>
              <p className="mt-4">{error || 'An unknown error occurred.'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
