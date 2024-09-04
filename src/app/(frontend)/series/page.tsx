import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import Card from '@/components/Blocks/Card';

const page: React.FC = async () => {
  const payload = await getPayloadHMR({ config: configPromise });
  const series = await payload.find({
    collection: 'episodes',
    sort: '-createdAt',
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Series</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.docs.map((serie) => (
          <Card key={serie.id} data={serie} />
        ))}
      </div>
    </div>
  );
};

export default page;
