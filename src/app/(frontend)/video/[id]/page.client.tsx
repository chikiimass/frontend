'use client';
import React, { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import CustomModal from '@/components/CustomModel';
import Native from '@/components/Ads/Native';
import Banner from '@/components/Ads/Banner';

interface Subtitle {
  id: string;
  language: string;
  url: string;
}

interface Video {
  id: string;
  videoQuality: string;
  videoLink: string;
  subtitles: Subtitle[];
}

interface Block {
  blockType: string;
  videos: Video[];
}

interface Thumbnail {
  url: string;
}

interface Data {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  duration?: number;
  thumbnail: Thumbnail;
  blocks: Block[];
  views: number;
}

interface VideoPageProps {
  data: Data;
}

const VideoPage: React.FC<VideoPageProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  // Extract video details from the blocks and restructure
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
    <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto overflow-x-none">
      {/* Video Player and Details */}
      <div className="flex-1 lg:w-3/4">
        <div className="relative">
          {/* Render VideoPlayer and pass the array of videos */}
          {videoDetails.length > 0 && (
            <VideoPlayer
              id={data.id}
              videoDetails={videoDetails} // Pass all video details (qualities)
              title={data.title} // Episode title
              thumbnail={data.thumbnail.url}
              views={data.views}
            />
          )}
          <section aria-label="Ad Banner" className="flex justify-center items-center mt-4 overflow-x-scroll">
            <Banner adKey="c3243d8605373e42e7e1ad5f78114b3e" height={60} width={468} />
          </section>
        </div>
        <div className="mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold mt-4 lg:mt-0">{data.title}</h1>
          <p className="text-gray-400 mb-2">Release Date: {new Date(data.releaseDate).toDateString()}</p>
          {data.duration && <p className="text-gray-400">Duration: {data.duration} mins</p>}
          <p className="text-lg mb-4">{data.description}</p>
        </div>

        {/* Download Buttons */}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Download Video</h2>
          <div className="space-y-2">
            {videoDetails.map(video => (
              <a
                key={video.id}
                href={video.link}
                target='_blank'
                download
                className="block w-64 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold text-center hover:bg-blue-700 transition-colors duration-300"
              >
                Download {video.quality}
              </a>
            ))}
          </div>
        </div>

        <button
          className="mt-4 w-64 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
          onClick={() => setShowModal(true)} // Show the modal on click
        >
          More Options
        </button>
      </div>

      {/* Related Videos */}
      <div className="lg:w-1/4 lg:pl-4 lg:sticky lg:top-0">
        <h2 className="text-2xl font-bold mb-4">Related Videos</h2>
        <div className="flex flex-col space-y-4">
          <Native />
        </div>
      </div>

      <CustomModal show={showModal} onClose={() => setShowModal(false)} message="Coming Soon.." />
    </div>
  );
};

export default VideoPage;
