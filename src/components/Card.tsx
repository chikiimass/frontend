import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  thumbnail: string;
  videoUrl: string;
}

const Card: React.FC<CardProps> = ({ title, thumbnail, videoUrl }) => {
  return (
    <div className="card bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link href={videoUrl}>
          <img src={thumbnail} alt={title} className="w-full h-40 sm:h-48 md:h-56 object-cover" />
          <div className="p-3">
            <h2 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 truncate">{title}</h2>
          </div>
      </Link>
    </div>
  );
};

export default Card;
