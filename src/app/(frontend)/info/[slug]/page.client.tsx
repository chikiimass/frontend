'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/Card';

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
    seasonN: any;
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

  // Determine if it's movie or series
  const isMovie = !!movie;
  const content = isMovie ? movie : series;

  return (
    <div className="w-full relative bg-gray-900 text-white">
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
      <div className="px-6 py-4 relative -mt-28 flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Poster */}
        <div className="avatar shrink-0 relative">
          <div className='w-24 rounded-full'>

            <Image
              src={isMovie ? content.moviePosterUrl : content.seriesPicUrl}
              alt={isMovie ? content.movieName : content.seriesName}
              fill
              className=" shadow-lg"
            />
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold">
            {isMovie ? content.movieName : content.seriesName}
          </h1>
          <p className="mt-4 text-gray-300 line-clamp-3">
            {content.description}
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
        <div className="mt-4">
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
                    {season.seasonN}
                  </a>
                ))}
              </div>

              {/* Episodes for Selected Season */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.seasons
                  .find((season) => season.id === selectedSeason)
                  ?.episodes.map((episode) => (
                    <Card title={episode.title} thumbnail={episode.thumbnail?.url} videoUrl={''} duration={''} userIcon={episode.icon?.url} views={episode.views} createdAt={episode.createdAt} />
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
