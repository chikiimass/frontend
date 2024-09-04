import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import Card from '@/components/Blocks/Card';

const MoviesPage: React.FC = async () => {
  const payload = await getPayloadHMR({ config: configPromise });
  const movies = await payload.find({
    collection: 'movies',
    sort: '-createdAt',
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.docs.map((movie) => (
          <Card key={movie.id} data={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
