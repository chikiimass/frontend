'use client'
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import CardBlock from '@/payload/blocks/CardBlocks';

export default function Bottom( { video }) {
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleCardClick = (video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  const videos = [/* Your video data here */];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div key={index} onClick={() => handleCardClick(video)}>
            <CardBlock data={video} />
          </div>
        ))}
      </div>

      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 1.5]}
      >
        {selectedVideo && (
          <div className="p-4">
            <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
            <p>{selectedVideo.description}</p>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
