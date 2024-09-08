import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import Card from '@/components/Blocks/Card';
import Link from 'next/link';
import CardRow from '@/components/CardRow';

const HomePage: React.FC = async () => {
  const payload = await getPayloadHMR({ config: configPromise });

  const featuredContent = await payload.find({
    collection: 'movies',
    sort: '-createdAt',
    limit: 1,
  });

  const latestMovies = await payload.find({
    collection: 'movies',
    sort: '-createdAt',
    limit: 6,
  });

  const latestSeries = await payload.find({
    collection: 'episodes',
    sort: '-createdAt',
    limit: 6,
  });

  const topRatedMovies = await payload.find({
    collection: 'movies',
    sort: '-rating',
    limit: 6,
  });

  const trendingSeries = await payload.find({
    collection: 'episodes',
    sort: '-views',
    limit: 6,
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden shadow-lg">
            {featuredContent.docs.map((item) => (
              <div
                key={item.id}
                className="w-full h-full bg-cover bg-center flex items-end justify-center text-white"
                style={{
                  backgroundImage: `url(${item.poster.url})`,
                }}
              >
                <div className="bg-black bg-opacity-52 p-8">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{item.title}</h1>
                  <p className="text-sm sm:text-lg mb-4">{item.description}</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    <Link href={`/video/${item.id}`}>
                      Watch Now
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Movies Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Movies</h2>
          <div>
              <CardRow data={latestMovies} />
          </div>
        </div>

        {/* Latest Series Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Series</h2>
          <div>
              <CardRow  data={latestSeries} />
          </div>
        </div>

        {/* Top Rated Movies Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Top Rated Movies</h2>
          <div>
              <CardRow data={topRatedMovies} />
          </div>
        </div>

        {/* Trending Series Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trending Series</h2>
          <div>
              <CardRow data={trendingSeries} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
