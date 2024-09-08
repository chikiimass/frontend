'use client';
import React, { useEffect, useState } from 'react';

const Countdown = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const tokenExpiry = localStorage.getItem('token-expiry');
    if (!tokenExpiry) {
      return;
    }

    const calculateTimeRemaining = () => {
      const now = Date.now();
      const expiryTime = parseInt(tokenExpiry, 10) * 1000;
      const timeLeft = Math.max(0, expiryTime - now);
      setTimeRemaining(timeLeft);
    };

    calculateTimeRemaining();

    const intervalId = setInterval(() => {
      calculateTimeRemaining();
    }, 1000); // Update countdown every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 p-2 bg-gray-800 text-white rounded-lg">
      {timeRemaining > 0 ? (
        <p>Your session expires in: {formatTime(timeRemaining)}</p>
      ) : (
        <p>Your session has expired. Please log in again.</p>
      )}
    </div>
  );
};

export default Countdown;
