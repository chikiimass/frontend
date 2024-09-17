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
  type: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ id, videoDetails, title, thumbnail, views, type }) => {
  const self = useRef<HTMLVideoElement>(null);
  let player: FluidPlayerInstance | null = null;
  const LABELS: Record<'series' | 'movies', string> = {
    series: 'episodes',
    movies: 'movies',
  };

  useEffect(() => {
    if (!player && self.current) {
      player = fluidPlayer(self.current, {
        layoutControls: {
          primaryColor: '#fff',
          playButtonShowing: false,
          posterImage: thumbnail,
          posterImageSize: 'cover',
          fillToContainer: true,
          autoPlay: true,
          allowDownload: true,
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
        },
        captions: {
          play: 'Play',
          pause: 'Pause',
          mute: 'Mute',
          unmute: 'Unmute',
          fullscreen: 'Fullscreen',
          exitFullscreen: 'Exit Fullscreen'
        },
        vastOptions: {
          allowVPAID: true,
          adList: [
            {
              roll: "preRoll",
              vastTag: "https://s.magsrv.com/splash.php?idzone=5418334"
            },
            {
              roll: "midRoll",
              vastTag: "https://s.magsrv.com/splash.php?idzone=5418334",
              timer: 8
            },
            {
              roll: "midRoll",
              vastTag: "https://s.magsrv.com/splash.php?idzone=5418334",
              timer: 10
            },
            {
              roll: "postRoll",
              vastTag: "https://s.magsrv.com/splash.php?idzone=5418334"
            }
          ],
          vastTimeout: 5000,
          adCTATextVast: false,
          showPlayButton: true
        },
      });
    }
  }, [self, title, thumbnail]);

/*   useEffect(() => {
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
  }, [id, views]); */
    // Update views if not done within the last hour
/*     useEffect(() => {
      const handleViewUpdate = async () => {
        const currentTime = new Date().getTime();
        const lastVisit = localStorage.getItem(`video_${id}`);
        const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
  
        if (!lastVisit || currentTime - parseInt(lastVisit) > ONE_HOUR) {
          // Patch the views to the server
          await fetch(`/api/${LABELS[type]}/${id}`, {
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
    }, [id, views]); */

      // Retry function for patch request
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

        // Retry only if it's a MongoDB write conflict (you can adjust this based on how your backend handles the error)
        if (i < retries - 1) {
          console.log(`Retrying patch request... Attempt ${i + 1}`);
          await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
        } else {
          console.error('Max retries reached. Could not patch views.');
        }
      }
    }
  };

      // Update views if not done within the last hour
  useEffect(() => {
    const handleViewUpdate = async () => {
      const currentTime = new Date().getTime();
      const lastVisit = localStorage.getItem(`video_${id}`);
      const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
  
      if (!lastVisit || currentTime - parseInt(lastVisit) > ONE_HOUR) {
        const url = `/api/${LABELS[type]}/${id}`;
        const body = { views: views + 1 };

        // Call the retry patch function
        await retryPatch(url, body);
  
        // Update localStorage with the current time
        localStorage.setItem(`video_${id}`, currentTime.toString());
      }
    };

    handleViewUpdate();
  }, [id, views, type]);

  return (
    <div className="video-player aspect-video">
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
