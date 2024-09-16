'use client';
import React, { useEffect, useRef, useState } from 'react';
import fluidPlayer from 'fluid-player';

interface VideoDetail {
  id: string;
  quality: string;
  link: string;
  subtitles: Array<{ id: string; language: string; url: string }>;
}

interface VideoPlayerProps {
  id: number;
  videoDetails: VideoDetail[];
  title: string;
  thumbnail: string;
  views: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ id, videoDetails, title, thumbnail, views }) => {
  const self = useRef<HTMLVideoElement>(null);
  let player: FluidPlayerInstance | null = null;

  useEffect(() => {
    if (!player && self.current) {
      player = fluidPlayer(self.current, {
        layoutControls: {
          primaryColor: '#28B8ED',
          playButtonShowing: false,
          posterImage: thumbnail,
          posterImageSize: 'cover',
          fillToContainer: true,
          autoPlay: true,
          preload: 'auto',
          mute: true,
          keyboardControl: true,
          title: title,
          controlBar: {
            autoHide: true,
            autoHideTimeout: 5,
            animated: true,
          },
        },
        vastOptions: {},
      });
    }
  }, [self, title, thumbnail]);

  useEffect(() => {
    const handleViewUpdate = async () => {
      const currentTime = new Date().getTime();
      const lastVisit = localStorage.getItem(`video_${id}`);
      const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

      if (!lastVisit || currentTime - parseInt(lastVisit) > ONE_HOUR) {
        // Patch the views to the server
        await fetch(`/api/episodes/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            views: views + 1,
          }),
        });

        // Update localStorage with the current time
        localStorage.setItem(`video_${id}`, currentTime.toString());
      }
    };

    handleViewUpdate();
  }, [id, views]);

  return (
    <div className="video-player">
      <video ref={self} className="w-full md:rounded-lg mb-4">
        {videoDetails.map((video) => (
          <source
            key={video.id}
            title={video.quality}
            src={`/api/proxy?url=${encodeURIComponent(video.link)}`}
            type="video/mp4"
          />
        ))}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
