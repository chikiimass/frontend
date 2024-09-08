import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import Card from '@/components/Blocks/Card';
import CardGrid from '@/components/CardGrid';

const SeriesPage: React.FC = async () => {
  const payload = await getPayloadHMR({ config: configPromise });
  const series = await payload.find({
    collection: 'episodes',
    sort: '-createdAt',
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Series</h1>

          <CardGrid videos={series} />
    </div>
  );
};

export default SeriesPage;
