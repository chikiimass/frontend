'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BottomSheet from './BottomSheet';
import VideoPlayer from '@/components/VideoPlayer';

interface VideoPageProps {
  data: {
    title: string;
    description: string;
    releaseDate: string;
    duration?: string;
  };
}

const VideoPage: React.FC<VideoPageProps> = ({ data }) => {
  const router = useRouter();

  const closeSheet = () => {
    router.back();
  };

  return (
    <BottomSheet
      isOpen={true}
      onClose={closeSheet}
      snapPoints={['100%']}
      fullScreen={true} 
    >
      <div className="p-4">
        <div className='player'>
          <VideoPlayer />
        </div>
        <h2 className="text-xl font-bold mb-4">{data.title}</h2>
        <p className="mb-2">{data.description}</p>
        <p className="mb-2"><strong>Release Date:</strong> {new Date(data.releaseDate).toDateString()}</p>
        {data.duration && <p><strong>Duration:</strong> {data.duration}</p>}
        <button onClick={closeSheet} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Close
        </button>
      </div>
    </BottomSheet>
  );
};

export default VideoPage;
