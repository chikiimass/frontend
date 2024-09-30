'use client';
import React, { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import Native from '@/components/Ads/Native';
import Banner from '@/components/Ads/Banner';
import { FacebookIcon, MessageCircleMore, Share2, XIcon } from 'lucide-react';
import Card from '@/components/Blocks/Card';
import Link from 'next/link';
import { Home } from '@/components/download/home'
import { Download } from '@/components/download/download'
import { useDownloadStore } from '@/store/downloads'
import { DownloadComponent } from '@/components/download/chikiidwe';

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
  season: number;
  seriesName: string;
  blocks: Block[];
  series: any;
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
  const { download } = useDownloadStore()

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

  // Find the current season
  const currentSeason = data.series.seasons.find(
    season => season.seasonNumber === data.season
  );

  const getOrderedEpisodes = (episodes: any[], currentEpisodeNumber: number) => {
    const currentIndex = episodes.findIndex(
      episode => episode.value.episodeNumber === currentEpisodeNumber
    );

    if (currentIndex === -1) return episodes; // Return as is if current episode not found

    // Reorder the episodes starting from the next one
    const reorderedEpisodes = [
      ...episodes.slice(currentIndex + 1), // Episodes after the current one
      ...episodes.slice(0, currentIndex + 1) // Episodes before and including the current one
    ];

    return reorderedEpisodes;
  };

  const videoTitle = data.title
  const imageUrl = data.thumbnail.url
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
            <h1 className="text-3xl font-bold mt-4 lg:mt-0">{data.seriesName} S{data.season} - {data.title}</h1>
            {/* Share Dialog  && Download*/}
            <div className=" flex space-x-4 items-center">
              <div>
                {/* {!download ? <DownloadComponent urlProp={videoDetails[0]?.link} /> : <Download {...download} />} */}
                {!download ? (
                  <DownloadComponent urlProp={videoDetails[0]?.link} />
                ) : (
                  <Download
                    name={`${data.seriesName} S${data.season} - ${data.title}`.replaceAll(' ', '_')}
                    url={download.url} />
                )}
              </div>
              <button
                className="text-primary"
                onClick={() => document.getElementById('my_modal_3')?.showModal()}
              >
                <Share2 />
              </button>
            </div>
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
                  {/* Facebook */}
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    <FacebookIcon className="w-6 h-6" />
                  </a>

                  {/* X (formerly Twitter) */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <XIcon className="w-6 h-6" />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(videoUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-400"
                  >
                    <MessageCircleMore className="w-6 h-6" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(videoUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-6 h-6 fill-current text-blue-700 hover:text-blue-600"
                    >
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
                  </a>

                  {/* Reddit */}
                  <a
                    href={`https://reddit.com/submit?url=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(videoTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-6 h-6 fill-current text-orange-600 hover:text-orange-500"
                    >
                      <path d="M373 138.6c-25.2 0-46.3-17.5-51.9-41l0 0c-30.6 4.3-54.2 30.7-54.2 62.4l0 .2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4C17.6 311.5 0 285.7 0 255.7c0-41.3 33.4-74.7 74.7-74.7c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4l0-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3zM157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9 .4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4z" /></svg>
                  </a>

                  {/* Pinterest */}
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(videoUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(videoTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                      className="w-6 h-6 fill-current text-red-600 hover:text-red-500"
                    >
                      <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" /></svg>
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(videoTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                      className="w-6 h-6 fill-current text-blue-500 hover:text-blue-600"
                    >
                      <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" /></svg>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent(videoTitle)}&body=${encodeURIComponent(videoUrl)}`}
                    className="text-gray-600 hover:text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-6 h-6 fill-current text-red-600 hover:text-red-500"
                    ><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
                  </a>
                </div>


                <p className="py-4">Press ESC key or click on ✕ button to close</p>
              </div>
              <div className=''>
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
            </dialog>
          </div>
          <p className="mb-2">Release Date: {new Date(data.releaseDate).toDateString()}</p>
          <p className="text-lg mb-4">{data.description}</p>


          {/* Episodes Buttons */}
          <div className="episodes-buttons mt-6">
            <h3 className="text-xl font-semibold mb-4">Episodes in Season {data.season}</h3>
            <div className="flex flex-wrap gap-2">
              {currentSeason?.episodes.map(episode => (
                <Link title={`${data.seriesName} S${data.season} ${episode.value.episodeNumber}`} key={episode.value.id} href={`/video/${episode.value.id}`}>
                  <button
                    key={episode.value.id}
                    className={`btn ${episode.value.id === data.id ? 'btn-active' : ''}`} // Ensure the comparison is correct
                  >
                    Episode {episode.value.episodeNumber}
                  </button>
                </Link>
              ))}
            </div>
          </div>

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
            {/* <h3 className="text-xl font-semibold mb-2">Comment Results</h3> */}
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
        {currentSeason && getOrderedEpisodes(currentSeason.episodes, data.id).map(episode => (
          episode.value.id !== data.id && ( // Prevent rendering the current episode card
            <Card key={episode.value.id} data={episode.value} />
          )
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
