import React from 'react';

const MyCustomUIField: React.FC = () => {
  return (
    <div className="p-2">
      <p className="text-xs text-gray-700">
        <b className="text-sm">Welcome to your dashboard!</b>
        <span>{' This is where site admins will log in to manage your website.'}</span>
      </p>
      <div className="w-full h-auto max-w-[150px] rounded-lg shadow-md">
        <video controls autoPlay >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default MyCustomUIField;
