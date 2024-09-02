// components/VideoPlayer.tsx
import React from 'react';

interface Quality {
  quality: string;
  url: string;
}

interface Subtitle {
  language: string;
  url: string;
}

interface VideoPlayerProps {
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  publishedAt: string;
  qualities: Quality[];
  subtitles: Subtitle[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  description,
  videoUrl,
  thumbnail,
  publishedAt,
  qualities,
  subtitles,
}) => {
  return (
    <div className="video-player">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600">{description}</p>
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-auto" />
        <video
          controls
          className="w-full"
          poster={thumbnail}
        >
          {qualities.map((quality, index) => (
            <source key={index} src={quality.url} type="video/mp4" label={quality.quality} />
          ))}
          {subtitles.map((subtitle, index) => (
            <track key={index} src={subtitle.url} kind="subtitles" srclang="en" label={subtitle.language} />
          ))}
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="text-gray-400">Published on: {new Date(publishedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default VideoPlayer;
