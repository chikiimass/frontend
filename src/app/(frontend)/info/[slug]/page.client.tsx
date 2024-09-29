'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Card from '@/components/Blocks/Card';

interface MovieData {
  bannerUrl: string;
  moviePosterUrl: string;
  movieName: string;
  description: string;
  parts: Array<{
    id: string;
    title: string;
    thumbnailUrl: string;
  }>;
  cast: Array<{
    id: string;
    name: string;
    role: string;
    profilePic: string;
  }>;
}

interface SeriesData {
  bannerUrl: string;
  seriesPicUrl: string;
  seriesName: string;
  description: string;
  seasons: Array<{
    id: string;
    title: string;
    seasonNumber: any;
    episodes: Array<{
      id?: string;
      seriesSlug?: string;
      slug?: string;
      poster?: { url: string };
      thumbnail?: { url: string };
      title?: string;
      name?: string;
      duration?: string;
      views?: number;
      createdAt?: string;
      icon?: { url: string } | null;
      blocks?: { videos?: { videoQuality?: string; videoLink?: string; subtitles?: { url?: string }[] }[] }[];
    }>;
  }>;
  cast: Array<{
    id: string;
    name: string;
    role: string;
    profilePic: string;
  }>;
}

interface ContentPageProps {
  data: {
    movies: { [key: string]: MovieData };
    series: { [key: string]: SeriesData };
  };
  slug: string;
}

const ContentPage: React.FC<ContentPageProps> = ({ data, slug }) => {
  const movie = data.movies[slug];
  const series = data.series[slug];

  // State for current tab and season
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [selectedSeason, setSelectedSeason] = useState(series?.seasons?.[0]?.id || ''); // Default to the first season
  const [maxHeight, setMaxHeight] = useState(0); // To maintain the maximum height

  // Ref for the tab content area
  const tabContentRef = useRef<HTMLDivElement>(null);

  // Determine if it's movie or series
  const isMovie = !!movie;
  const content = isMovie ? movie : series;

  const truncateDescription = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Measure the content height when the tab changes
  useEffect(() => {
    if (tabContentRef.current) {
      const currentHeight = tabContentRef.current.scrollHeight;
      setMaxHeight((prevMaxHeight) => Math.max(prevMaxHeight, currentHeight));
    }
  }, [selectedTab, selectedSeason]);

  return (
    <div className="w-full relative overflow-x-none">
      {/* Banner */}
      <div className="relative w-full h-[500px]">
        <Image
          src={content.bannerUrl}
          alt={isMovie ? content.movieName : content.seriesName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Poster, Title, and Description */}
      <div className="px-6 py-4 relative -mt-28 flex flex-col lg:flex-row items-start gap-4 lg:gap-8">
        {/* Poster */}
        <div className="avatar shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={isMovie ? content.moviePosterUrl : content.seriesPicUrl}
              alt={isMovie ? content.movieName : content.seriesName}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold">
            {isMovie ? content.movieName : content.seriesName}
          </h1>
          <p className="mt-2 text-gray-300">
            {truncateDescription(content.description, 100)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 px-6">
        <div role="tablist" className="tabs tabs-bordered">
          <a
            role="tab"
            className={`tab ${selectedTab === 'Overview' ? 'tab-active' : ''}`}
            onClick={() => setSelectedTab('Overview')}
          >
            Overview
          </a>
          <a
            role="tab"
            className={`tab ${selectedTab === 'Videos' ? 'tab-active' : ''}`}
            onClick={() => setSelectedTab('Videos')}
          >
            {isMovie ? 'Videos' : 'Seasons'}
          </a>
          <a
            role="tab"
            className={`tab ${selectedTab === 'Casts' ? 'tab-active' : ''}`}
            onClick={() => setSelectedTab('Casts')}
          >
            Casts
          </a>
        </div>

        {/* Tab Content */}
        <div
          ref={tabContentRef}
          className="mt-4 transition-all duration-300"
          style={{ minHeight: maxHeight }} // Set the minHeight to the max height achieved
        >
          {selectedTab === 'Overview' && (
            <div className="text-gray-300">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p>{content.description}</p>
            </div>
          )}

          {/* Videos (Movies) or Seasons (Series) */}
          {selectedTab === 'Videos' && isMovie && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.parts.map((part) => (
                <div key={part.id} className="bg-gray-800 p-4 rounded-lg">
                  <Image
                    src={part.thumbnailUrl}
                    alt={part.title}
                    width={300}
                    height={200}
                    className="object-cover rounded-md"
                  />
                  <h3 className="text-lg mt-2">{part.title}</h3>
                </div>
              ))}
            </div>
          )}

          {/* Seasons and Episodes (Series) */}
          {selectedTab === 'Videos' && !isMovie && (
            <div>
              {/* Seasons Tabs */}
              <div role="tablist" className="tabs tabs-boxed mb-4">
                {content.seasons.map((season) => (
                  <a
                    key={season.id}
                    role="tab"
                    className={`tab ${selectedSeason === season.id ? 'tab-active' : ''}`}
                    onClick={() => setSelectedSeason(season.id)}
                  >
                    {season.seasonNumber}
                  </a>
                ))}
              </div>

              {/* Episodes for Selected Season */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.seasons
                  .find((season) => season.id === selectedSeason)
                  ?.episodes.map((episode: any) => (
                    <Card data={episode} />
                  ))}
              </div>
            </div>
          )}

          {/* Casts */}
          {selectedTab === 'Casts' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.cast.map((castMember) => (
                <div key={castMember.id} className="bg-gray-800 p-4 rounded-lg">
                  <Image
                    src={castMember.profilePic}
                    alt={castMember.name}
                    width={100}
                    height={100}
                    className="object-cover rounded-full"
                  />
                  <h3 className="text-lg mt-2">{castMember.name}</h3>
                  <p className="text-gray-400">{castMember.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
