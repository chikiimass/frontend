import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import CardGrid from '@/components/CardGrid';

const MoviesPage: React.FC = async () => {
  const payload = await getPayloadHMR({ config: configPromise });
  const movies = await payload.find({
    collection: 'movies',
    sort: '-createdAt',
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <CardGrid
        videos={movies}
      />
    </div>
  );
};

export default MoviesPage;
