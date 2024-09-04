'use client'
import { createContext, useState, useContext, ReactNode } from 'react';

interface VideoPlayerContextType {
  currentVideo: { id: string } | null;
  setCurrentVideo: (video: { id: string } | null) => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

export const VideoPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState<{ id: string } | null>(null);

  return (
    <VideoPlayerContext.Provider value={{ currentVideo, setCurrentVideo }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayer = (): VideoPlayerContextType => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  return context;
};
