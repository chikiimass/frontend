import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  userIcon: string;
  views: number;
  createdAt: string;
}

const Card: React.FC<CardProps> = ({ title, thumbnail, videoUrl, duration, userIcon='https://avatars.githubusercontent.com/u/96200882?v=4', views=20, createdAt=10 }) => {
  return (
    <div className="card bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link href={videoUrl}>
        <div className="relative">
          <img src={thumbnail} alt={title} className="w-full h-40 sm:h-48 md:h-56 object-cover" />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">{duration}</span>
        </div>
        <div className="p-3">
          <h2 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 truncate">{title}</h2>
          <div className="flex items-center mt-2 text-gray-600 text-xs sm:text-sm">
            <img src={userIcon} alt="User icon" className="w-6 h-6 rounded-full mr-2" />
            <span className="mr-2">{views} views</span>
            <span>•</span>
            <span className="ml-2">{createdAt}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
