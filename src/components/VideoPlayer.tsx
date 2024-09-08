import React from 'react';


const VideoPlayer = ({ video='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }) => {
  return (
    <div className="video-player">
      <video  autoPlay className='w-full' controls>
        <source src={video} type='video/mp4' />
      </video>
    </div>
  );
};

export default VideoPlayer