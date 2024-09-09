import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    // Handle .m3u8 (HLS) format using hls.js if browser does not natively support it
    if (Hls.isSupported() && video.endsWith('.m3u8')) {
      const hls = new Hls();
      hls.loadSource(video);
      hls.attachMedia(videoElement);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS.js error', event, data);
      });
    } else {
      // If not HLS, simply assign the video source for native formats
      videoElement.src = video;
    }

    return () => {
      if (Hls.isSupported() && video.endsWith('.m3u8')) {
        videoElement.pause();
        videoElement.removeAttribute('src'); // Remove the source when cleaning up
      }
    };
  }, [video]);

  return (
    <div className="video-player">
      <video ref={videoRef} autoPlay controls className="w-full">
        {/* Fallback sources for additional formats */}
        <source src={video} type="video/mp4" /> {/* MP4 format */}
        <source src={video} type="video/x-matroska" /> {/* MKV format */}
        <source src={video} type="video/ogg" /> {/* Ogg format */}
        <source src={video} type="video/webm" /> {/* WebM format */}
        <source src={video} type="application/x-mpegURL" /> {/* HLS format */}
        <source src={video} type="video/avc" /> {/* AVC format */}
        <source src={video} type="video/x-msvideo" /> {/* AVI format */}
        <p>Your browser does not support the video tag or the specified formats.</p>
      </video>
    </div>
  );
};

export default VideoPlayer;
