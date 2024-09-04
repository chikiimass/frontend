import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import Card from '@/components/Blocks/Card';

const page: React.FC = async () => {
  const payload = await getPayloadHMR({ config: configPromise });
  const latestContent = await payload.find({
    collection: 'movies', // Fetch movies
    sort: '-createdAt',
    limit: 10,
  });

  const latestSeries = await payload.find({
    collection: 'episodes', // Fetch series
    sort: '-createdAt',
    limit: 10,
  });

  const combinedContent = [...latestContent.docs, ...latestSeries.docs];

  combinedContent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Latest</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {combinedContent.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default page;
