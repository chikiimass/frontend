import React from 'react';

interface AdminVideoPlayerProps {
  videoUrl: string;
}

const AdminVideoPlayer: React.FC<AdminVideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="video-player">
      {videoUrl ? (
        <video controls className="w-full h-auto">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video URL provided</p>
      )}
    </div>
  );
};

export default AdminVideoPlayer;
