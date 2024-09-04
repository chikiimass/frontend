import React from 'react';


const VideoPlayer = () => {
  return (
    <div className="video-player">
      <video  autoPlay className='w-full' controls>
        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" type='video/mp4' />
      </video>
    </div>
  );
};

export default VideoPlayer