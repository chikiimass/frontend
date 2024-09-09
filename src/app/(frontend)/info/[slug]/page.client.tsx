'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Mock data for series and movies
const seriesData = {
  'game-of-thrones': {
    bannerUrl: 'https://via.placeholder.com/1200x300?text=Game+of+Thrones+Banner',
    seriesPicUrl: 'https://via.placeholder.com/150?text=GoT+Poster',
    seriesName: 'Game of Thrones',
    description: 'Game of Thrones is a fantasy series based on the novels by George R.R. Martin. It is set in the fictional continents of Westeros and Essos.',
    seasons: [
      {
        id: '1',
        title: 'Season 1',
        episodes: [
          { id: '1', title: 'Winter Is Coming', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Episode+1' },
          { id: '2', title: 'The Kingsroad', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Episode+2' },
          { id: '3', title: 'Lord Snow', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Episode+3' },
        ],
      },
    ],
    cast: [
      { id: '1', name: 'Emilia Clarke', role: 'Daenerys Targaryen', profilePic: 'https://via.placeholder.com/150?text=Emilia+Clarke' },
      { id: '2', name: 'Kit Harington', role: 'Jon Snow', profilePic: 'https://via.placeholder.com/150?text=Kit+Harington' },
      { id: '3', name: 'Lena Headey', role: 'Cersei Lannister', profilePic: 'https://via.placeholder.com/150?text=Lena+Headey' },
    ],
  },
};

const movieData = {
  'fast-and-furious': {
    bannerUrl: 'https://via.placeholder.com/1200x300?text=Fast+and+Furious+Banner',
    moviePosterUrl: 'https://via.placeholder.com/150?text=Fast+and+Furious+Poster',
    movieName: 'Fast and Furious',
    description: 'Fast & Furious is a media franchise centered on illegal street racing, heists, spies, and family.',
    parts: [
      { id: '1', title: 'The Fast and the Furious (2001)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+1' },
      { id: '2', title: '2 Fast 2 Furious (2003)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+2' },
      { id: '3', title: 'Fast & Furious (2009)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+3' },
      { id: '4', title: 'Fast Five (2011)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+4' },
      { id: '5', title: 'Fast & Furious 6 (2013)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+5' },
      { id: '6', title: 'Furious 7 (2015)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+6' },
      { id: '7', title: 'The Fate of the Furious (2017)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+7' },
      { id: '8', title: 'F9 (2021)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+8' },
      { id: '9', title: 'Fast X (2023)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+9' },
    ],
    cast: [
      { id: '1', name: 'Vin Diesel', role: 'Dominic Toretto', profilePic: 'https://via.placeholder.com/150?text=Vin+Diesel' },
      { id: '2', name: 'Paul Walker', role: 'Brian O\'Conner', profilePic: 'https://via.placeholder.com/150?text=Paul+Walker' },
      { id: '3', name: 'Dwayne Johnson', role: 'Luke Hobbs', profilePic: 'https://via.placeholder.com/150?text=Dwayne+Johnson' },
    ],
  },
};

const ContentPage = ({ params }: { params: { slug: string } }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const { slug } = params;

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current && headerRef.current) {
        const tabsTop = tabsRef.current.getBoundingClientRect().top;
        setIsSticky(tabsTop <= 0);
      }
    };

    const debounceScroll = debounce(handleScroll, 100);
    window.addEventListener('scroll', debounceScroll);
    return () => window.removeEventListener('scroll', debounceScroll);
  }, []);

  function debounce(fn: Function, delay: number) {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  // Determine whether the slug is for a series or a movie
  const isSeries = seriesData[slug as string];
  const isMovie = movieData[slug as string];

  const renderContent = () => {
    if (isSeries) {
      switch (activeTab) {
        case 'seasons':
          return (
            <div>
              {seriesData[slug as string].seasons.map((season) => (
                <div key={season.id} className="mb-8">
                  <h2 className="text-2xl font-semibold">{season.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {season.episodes.map((episode) => (
                      <div key={episode.id} className="bg-white p-4 rounded-md shadow-md">
                        <Image
                          src={episode.thumbnailUrl}
                          alt={episode.title}
                          width={320}
                          height={180}
                          className="w-full h-auto object-cover"
                        />
                        <h3 className="mt-2 text-lg font-semibold">{episode.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        case 'cast':
          return (
            <div className="space-y-4">
              {seriesData[slug as string].cast.map((actor) => (
                <div key={actor.id} className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-md">
                  <Image
                    src={actor.profilePic}
                    alt={actor.name}
                    width={150}
                    height={150}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{actor.name}</h3>
                    <p className="text-gray-600">{actor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        case 'overview':
        default:
          return (
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-2 text-gray-600">{seriesData[slug as string].description}</p>
            </div>
          );
      }
    } else if (isMovie) {
      switch (activeTab) {
        case 'parts':
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {movieData[slug as string].parts.map((part) => (
                <div key={part.id} className="bg-white p-4 rounded-md shadow-md">
                  <Image
                    src={part.thumbnailUrl}
                    alt={part.title}
                    width={320}
                    height={180}
                    className="w-full h-auto object-cover"
                  />
                  <h3 className="mt-2 text-lg font-semibold">{part.title}</h3>
                </div>
              ))}
            </div>
          );
        case 'cast':
          return (
            <div className="space-y-4">
              {movieData[slug as string].cast.map((actor) => (
                <div key={actor.id} className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-md">
                  <Image
                    src={actor.profilePic}
                    alt={actor.name}
                    width={150}
                    height={150}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{actor.name}</h3>
                    <p className="text-gray-600">{actor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        case 'overview':
        default:
          return (
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-2 text-gray-600">{movieData[slug as string].description}</p>
            </div>
          );
      }
    } else {
      // Handle cases where the series or movie is not found
      return (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold">Not Found</h2>
          <p className="mt-2 text-gray-600">The series or movie you are looking for was not found.</p>
        </div>
      );
    }
  };

  return (
    <div className="container min-h-screen mx-auto">
      {isSeries || isMovie ? (
        <>
          <div ref={headerRef} className="relative">
            <Image
              src={isSeries ? seriesData[slug as string].bannerUrl : movieData[slug as string].bannerUrl}
              alt={isSeries ? seriesData[slug as string].seriesName : movieData[slug as string].movieName}
              width={1200}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-1/2 left-4 flex items-center space-x-4">
              <Image
                src={isSeries ? seriesData[slug as string].seriesPicUrl : movieData[slug as string].moviePosterUrl}
                alt={isSeries ? seriesData[slug as string].seriesName : movieData[slug as string].movieName}
                width={150}
                height={150}
                className="rounded-full border-4 border-white"
              />
              <div>
                <h1 className="text-4xl font-semibold">{isSeries ? seriesData[slug as string].seriesName : movieData[slug as string].movieName}</h1>
                <p className="mt-2 text-gray-600">{isSeries ? seriesData[slug as string].description : movieData[slug as string].description}</p>
              </div>
            </div>
          </div>

          <div ref={tabsRef} className='bg-white'>
            <div className="flex space-x-4 px-4 py-2">
              <button
                className={`px-4 py-2 ${activeTab === 'overview' ? 'font-semibold text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              {isSeries ? (
                <button
                  className={`px-4 py-2 ${activeTab === 'seasons' ? 'font-semibold text-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('seasons')}
                >
                  Seasons
                </button>
              ) : (
                <button
                  className={`px-4 py-2 ${activeTab === 'parts' ? 'font-semibold text-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('parts')}
                >
                  Parts
                </button>
              )}
                            <button
                className={`px-4 py-2 ${activeTab === 'cast' ? 'font-semibold text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('cast')}
              >
                Cast
              </button>
            </div>
          </div>

           <div className="max-w-6xl mx-auto px-4 py-4 mt-16">{renderContent()}</div>
        </>
      ) : (
        // If neither a series nor a movie is found, show a 404 message
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold">Not Found</h2>
          <p className="mt-2 text-gray-600">The series or movie you are looking for was not found.</p>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
