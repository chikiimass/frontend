import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface CustomModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
  link?: string;
  linkText?: string;
  additionalContent?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ show, onClose, message, link, linkText, additionalContent }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Notification</h2>
        <p className="mb-4 text-secondary">{message}</p>
        {link && (
          <Link href={link}>
            <a className="inline-block bg-primary text-white px-4 py-2 rounded mb-4 hover:bg-primary-focus">
              {linkText}
            </a>
          </Link>
        )}
        {additionalContent && <div className="mb-4">{additionalContent}</div>}
      </div>
    </div>
  );
};

export default CustomModal;