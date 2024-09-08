'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import VideoPlayer from '@/components/VideoPlayer';
import CustomModal from '@/components/CustomModel';

const VideoPage = ({ data }) => {
  const [showModal, setShowModal] = useState(false)


  // Extract video details from the blocks
  const videoDetails = data.blocks.flatMap(block =>
    block.blockType === 'video-block'
      ? block.videos.map(video => ({
        id: video.id,
        quality: video.videoQuality,
        link: video.videoLink,
        subtitles: video.subtitles,
      }))
      : []
  );

  return (
    <div
    >
      <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto">
        {/* Video Player and Details */}
        <div className="flex-1 lg:w-3/4">
          <div className="sticky top-0 z-10 lg:static">
            <div className="relative">
              {videoDetails.length > 0 && (
                <VideoPlayer video={videoDetails[0].link} />
              )}
            </div>
          </div>
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold mt-4 lg:mt-0">{data.title}</h1>
            <p className="text-gray-400 mb-2">Release Date: {new Date(data.releaseDate).toDateString()}</p>
            {data.duration && <p className="text-gray-400">Duration: {data.duration} mins</p>}
            <p className="text-lg mb-4">{data.description}</p>
            {videoDetails.length > 0 && videoDetails[0].subtitles.length > 0 && (
              <div>
                <strong className="text-lg">Subtitles:</strong>
                <ul className="list-disc pl-5 mt-2 text-blue-400">
                  {videoDetails[0].subtitles.map(sub => (
                    <li key={sub.id}>
                      <a href={sub.url} target="_blank" rel="noopener noreferrer">{sub.language}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
              className="mt-4 w-64 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
              onClick={() => setShowModal(true)} // Show the modal on click
            >
              Download Video
            </button>
        </div>

        {/* Related Videos */}
        <div className="lg:w-1/4 lg:pl-4 lg:sticky lg:top-0">
          <h2 className="text-2xl font-bold mb-4">Related Videos</h2>
          <div className="flex flex-col space-y-4">
            
          </div>  
        </div>
      </div>
      <CustomModal show={showModal} onClose={() => setShowModal(false)} message="Coming Soon.." />
    </div>
  );
};

export default VideoPage;
