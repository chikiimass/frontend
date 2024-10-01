import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import Link from 'next/link';
import CardRow from '@/components/CardRow';
import Banner from '@/components/Ads/Banner';
import { draftMode } from 'next/headers'


export const dynamic = 'force-static';
export const revalidate = 600;

const { isEnabled: draft } = draftMode()

const HomePage: React.FC = async () => {
  const payload = await getPayloadHMR({ config: configPromise });

  /*   const featuredContent = await payload.find({
      collection: 'movies',
      sort: '-createdAt',
      limit: 1,
    }); */

  async function fetchFeaturedContentFromCollections(collections: string[]) {
    for (const collection of collections) {
      try {
        const result = await payload.find({
          collection,
          draft,
          sort: '-createdAt',
          limit: 1,
          overrideAccess: draft,
        });

        if (result.docs.length > 0) {
          return result;
        }
      } catch (error) {
        console.error(`Error fetching from collection ${collection}:`, error);
      }
    }

    return null; // If no results from any collection
  }

  // Usage
  const collections = ['episodes', 'movies'];
  const featuredContent = await fetchFeaturedContentFromCollections(collections);

  const latestMovies = await payload.find({
    collection: 'movies',
    draft
    sort: '-createdAt',
    depth: 3,
    limit: 6,
    overrideAccess: draft,
  });

  const latestSeries = await payload.find({
    collection: 'episodes',
    sort: '-createdAt',
    draft,
    overrideAccess: draft,
    depth: 3,
    limit: 6,
  });

  const topRatedMovies = await payload.find({
    collection: 'movies',
    sort: '-rating',
    draft,
    overrideAccess: draft,
    limit: 6,
  });

  const trendingSeries = await payload.find({
    collection: 'episodes',
    sort: '-views',
    draft,
    overrideAccess: draft,
    limit: 6,
  });

  return (
    <div className="flex flex-col h-screen overflow-x-none">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section>
          {featuredContent?.docs.map((item) => (
            <div
              key={item.id}
              className="hero min-h-screen"
              style={{
                backgroundImage: item?.poster?.url ? `url(${item.poster.url})` : `url(${item?.thumbnail?.url})`,
              }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">
                    {item.title || item.name || 'Untitled'}
                  </h1>
                  <p className="mb-5 truncate-multiline">
                    {item.description}
                  </p>

                  <Link title={item.title || item.name || 'Untitled'} href={`/video/${item.id}`}>
                    <button className="btn btn-primary">
                      Watch Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section aria-label="Ad Banner" className="flex justify-center items-center overflow-x-scroll">
          <Banner adKey="c3243d8605373e42e7e1ad5f78114b3e" height={60} width={468} />
        </section>

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
            <CardRow data={latestSeries} />
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
