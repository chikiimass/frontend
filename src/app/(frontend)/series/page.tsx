import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import CardGrid from '@/components/CardGrid';
import ExoClickNative from '@/components/Ads/ExoClick/Native';

const SeriesPage: React.FC = async () => {
  const payload = await getPayloadHMR({ config: configPromise });
  const series = await payload.find({
    collection: 'episodes',
    limit: 30,
    sort: '-createdAt',
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Series</h1>
      <ExoClickNative />
      <CardGrid videos={series} />
    </div>
  );
};

export default SeriesPage;
