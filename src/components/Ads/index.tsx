'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Ads() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to create a smooth fade-in effect
    const timeout = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null; // Prevent initial modal flash

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="modal-box relative max-w-lg w-full p-6 bg-white rounded-xl shadow-2xl border border-gray-200 animate-slideUp">
        {/* Close Button */}
{/*         <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          onClick={() => setIsVisible(false)}
        >
          ✕
        </button> */}

        {/* Modal Header */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-error mb-2">Adblock Detected</h3>
          <p className="text-gray-500 text-lg">
            Our website depends on ads to keep offering free content. Please support us by disabling your ad-blocker.
          </p>
        </div>

        {/* Modal Body */}
        <div className="my-6 flex justify-center">
          <img
            src="/images/adblock-warning.svg" // You can add a custom SVG warning icon for a more professional look
            alt="Adblock warning"
            className="w-32 h-32"
          />
        </div>

        {/* Modal Actions */}
        <div className="modal-action flex justify-between items-center gap-4">
          <button
            className="btn btn-primary w-full md:w-auto px-6"
            onClick={() => router.refresh()}
          >
            Refresh Page
          </button>

          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline w-full md:w-auto px-6"
          >
            How to Disable Adblock
          </a>
        </div>
      </div>

      {/* Background Fade Out */}
      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
