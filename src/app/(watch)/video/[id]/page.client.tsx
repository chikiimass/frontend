'use client';
import React, { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import Native from '@/components/Ads/Native';
import Banner from '@/components/Ads/Banner';
import { FacebookIcon, MessageCircleMore, Share2, XIcon } from 'lucide-react';

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
  type: String;
}

interface VideoPageProps {
  data: Data;
}

export const dynamic = 'force-static';
export const revalidate = 600;

const VideoPage: React.FC<VideoPageProps> = ({ data }) => {
  const [copySuccess, setCopySuccess] = useState(false);

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

  const videoUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/video/${data.id}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(videoUrl); // Copy URL
    setCopySuccess(true); // Show success alert
    setTimeout(() => {
      setCopySuccess(false); // Hide after 3 seconds
    }, 3000);
  };

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
              type={data.type}
            />
          )}
          <section aria-label="Ad Banner" className="flex justify-center items-center mt-1 overflow-x-scroll">
            <Banner adKey="c3243d8605373e42e7e1ad5f78114b3e" height={60} width={468} />
          </section>
        </div>
        <div className="mb-6 lg:mb-0">
          <div className="flex flex-row justify-between pr-2">
            <h1 className="text-3xl font-bold mt-4 lg:mt-0">{data.title}</h1>
            {/* Share Dialog */}
            <button
              className="text-primary"
              onClick={() => document.getElementById('my_modal_3')?.showModal()}
            >
              <Share2 />
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box relative p-6">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <h2 className="text-2xl font-bold mb-4">Share This Video</h2>

                <div className="mb-4">
                  <label htmlFor="shareInput" className="block font-medium mb-2">Copy Link:</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="shareInput"
                      value={videoUrl}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none cursor-pointer"
                      readOnly
                      onClick={handleCopyUrl} // Auto select and copy on click
                    />
                    <button
                      onClick={handleCopyUrl}
                      className="absolute inset-y-0 right-0 px-3 py-2 rounded-r-lg"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4 mt-4">
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    <FacebookIcon className="w-6 h-6" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <XIcon className="w-6 h-6" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(videoUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-400"
                  >
                    <MessageCircleMore className="w-6 h-6" />
                  </a>
                </div>

                <p className="py-4">Press ESC key or click on ✕ button to close</p>
              </div>
            </dialog>
            {/* Success Alert */}
            {copySuccess && (
              <div role="alert" className="alert alert-success flex items-center mt-4 p-4 rounded-md z-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-2">URL copied to clipboard!</span>
              </div>
            )}
          </div>
          <p className="mb-2">Release Date: {new Date(data.releaseDate).toDateString()}</p>
          {data.duration && <p>Duration: {data.duration} mins</p>}
          <p className="text-lg mb-4">{data.description}</p>

          {/* Comments Section */}
          <div className="comments-section mt-8">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none resize-none"
              placeholder="Comments are disabled for now."
              rows={4}
              disabled
            />
          </div>

          {/* Comment Results */}
          <div className="comment-results mt-6 lg:block hidden">
            <h3 className="text-xl font-semibold mb-2">Comment Results</h3>
            <ul className="space-y-4">
{/*               <li className="border-b pb-4">
                <p className="font-semibold">John Doe</p>
                <p className="text-sm">Great video! Very informative.</p>
              </li>
              <li className="border-b pb-4">
                <p className="font-semibold">Jane Smith</p>
                <p className="text-sm">Looking forward to more content like this.</p>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Videos */}
      <div className="lg:w-1/4 lg:pl-4 lg:sticky lg:top-0">
        <h2 className="text-2xl font-bold mb-4">Related Videos</h2>
        <div className="flex flex-col space-y-4">
          <Native />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
