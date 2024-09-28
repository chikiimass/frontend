'use client';
import React, { useEffect, useRef } from 'react';
import fluidPlayer from 'fluid-player';

interface VideoDetail {
  id: string;
  quality: string;
  link: string;
  subtitles: Array<{ id: string; language: string; url: string }>;
}

interface VideoPlayerProps {
  id: string; // Updated to match the data structure
  videoDetails: VideoDetail[];
  title: string;
  thumbnail: string;
  views: number;
  type: string;
}

const FallbackVideoURL = 'https://chikiimass.me/mp4/video.mp4';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ id, videoDetails, title, thumbnail, views, type }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let player: FluidPlayerInstance | null = null;
  const LABELS: Record<'series' | 'movies', string> = {
    series: 'episodes',
    movies: 'movies',
  };

  // Key for storing playback time in localStorage
  const playbackTimeKey = `video_playback_time_${id}`;

  // Resume playback from saved time
  const resumePlayback = () => {
    const savedTime = localStorage.getItem(playbackTimeKey);
    if (savedTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(savedTime); // Resume from saved time
    }
  };

  // Save current playback time to localStorage
  const savePlaybackTime = () => {
    if (videoRef.current) {
      localStorage.setItem(playbackTimeKey, videoRef.current.currentTime.toString());
    }
  };

  useEffect(() => {
    if (!player && videoRef.current) {
      player = fluidPlayer(videoRef.current, {
        layoutControls: {
          primaryColor: 'royalblue',
          playButtonShowing: false,
          posterImage: thumbnail,
          posterImageSize: 'cover',
          fillToContainer: true,
          preload: 'auto',
          allowTheatre: false,
          mute: false,
          playbackRateEnabled: true,
          keyboardControl: true,
          title: title,
          controlBar: {
            autoHide: true,
            autoHideTimeout: 5,
            animated: true,
          },
          persistentSettings: {
            volume: false,
            quality: false,
            speed: false,
            theatre: false,
          },
        },
      });

      // Resume playback when the video is ready
      videoRef.current.addEventListener('loadedmetadata', resumePlayback);
      
      // Save playback time periodically
      videoRef.current.addEventListener('timeupdate', savePlaybackTime);
    }

    // Cleanup event listeners when the component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', resumePlayback);
        videoRef.current.removeEventListener('timeupdate', savePlaybackTime);
      }
    };
  }, [videoRef, title, thumbnail]);

  // Retry function with exponential backoff
  const retryPatch = async (url: string, body: object, retries: number = 3, delay: number = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Failed to update views: ${response.statusText}`);
        }

        // Success
        return;
      } catch (error) {
        console.error('Error patching views:', error);

        if (i < retries - 1) {
          console.log(`Retrying patch request... Attempt ${i + 1}`);
          await new Promise((resolve) => setTimeout(resolve, delay)); // Exponential backoff
        } else {
          console.error('Max retries reached. Could not patch views.');
        }
      }
    }
  };

  const getMimeType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'm3u8':
        return 'application/x-mpegURL';
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      default:
        return 'video/mp4';
    }
  };

  // Sort videoDetails based on quality (e.g., '1080p', '720p', '480p')
  const sortedVideoDetails = [...videoDetails].sort((a, b) => {
    const getQualityValue = (quality: string) => {
      if (quality.includes('1080p')) return 1080;
      if (quality.includes('720p')) return 720;
      if (quality.includes('480p')) return 480;
      return parseInt(quality) || 0; // Fallback to parse if no "p" or other known value
    };

    return getQualityValue(b.quality) - getQualityValue(a.quality); // Sort in descending order
  });

  // Update views if not done within the last hour
  useEffect(() => {
    const handleViewUpdate = async () => {
      const currentTime = new Date().getTime();
      const lastVisit = localStorage.getItem(`video_${id}`);
      const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

      if (!lastVisit || currentTime - parseInt(lastVisit) > ONE_HOUR) {
        const url = `/api/${LABELS[type]}/${id}`;
        const body = { views: views + 1 }; // Increment views

        // Call the retry patch function
        await retryPatch(url, body);

        // Update localStorage with the current time
        localStorage.setItem(`video_${id}`, currentTime.toString());
      }
    };

    handleViewUpdate();
  }, [id, views, type]);

  // Fallback handling
  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.currentTarget;
    videoElement.src = FallbackVideoURL;
  };

  return (
    <div className="video-player aspect-video">
      <video ref={videoRef} crossOrigin="anonymous" className="w-full md:rounded-lg mb-4" onError={handleError}>
        {sortedVideoDetails.map((video) => {
          const isHD = video.quality.includes('720p') || video.quality.includes('1080p') || parseInt(video.quality) >= 720;
          return (
            <source
              key={video.id}
              title={video.quality}
              src={video.link}
              type={getMimeType(video.link)}
              {...(isHD ? { 'data-fluid-hd': true } : {})}
            />
          )
        })}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
