'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface VideoState {
  currentTime: number;
  isPlaying: boolean;
}

interface VideoPlayerContextProps {
  video: { id: number; url: string; title: string } | null;
  videoState: VideoState;
  minimized: boolean;
  playedVideos: { id: number; url: string; title: string; thumbnail: string }[];
  setVideo: (video: { id: number; url: string; title: string } | null) => void;
  setVideoState: (state: VideoState) => void;
  setMinimized: (minimized: boolean) => void;
  addPlayedVideo: (video: { id: number; url: string; title: string; thumbnail: string }) => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextProps | undefined>(undefined);

export const VideoPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [video, setVideo] = useState<{ id: number; url: string; title: string } | null>(null);
  const [videoState, setVideoState] = useState<VideoState>({ currentTime: 0, isPlaying: false });
  const [minimized, setMinimized] = useState<boolean>(false);
  const [playedVideos, setPlayedVideos] = useState<{ id: number; url: string; title: string; thumbnail: string }[]>([]);

  // Load playedVideos from localStorage on component mount
  useEffect(() => {
    const storedVideos = localStorage.getItem('playedVideos');
    if (storedVideos) {
      setPlayedVideos(JSON.parse(storedVideos));
    }
  }, []);

  // Save playedVideos to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('playedVideos', JSON.stringify(playedVideos));
  }, [playedVideos]);

  const addPlayedVideo = (video: { id: number; url: string; title: string; thumbnail: string }) => {
    if (!playedVideos.find(v => v.id === video.id)) {
      const updatedVideos = [...playedVideos, video];
      setPlayedVideos(updatedVideos);
    }
  };

  return (
    <VideoPlayerContext.Provider value={{ video, videoState, minimized, playedVideos, setVideo, setVideoState, setMinimized, addPlayedVideo }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayer = (): VideoPlayerContextProps => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  return context;
};