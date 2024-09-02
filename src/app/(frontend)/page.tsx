import React from 'react';
import Card from '@/components/Card';
import { fetchPayloadData } from '@/utils/payloadAPI';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config'

interface HomePageProps {
  movies: {
    title: string;
    description: string;
    thumbnail: string;
    videoBlocks: {
      title: string;
      description: string;
      videoUrl: string;
      thumbnail: string;
      publishedAt: string;
      qualities: { quality: string; url: string }[];
      subtitles: { language: string; url: string }[];
    }[];
    cardBlocks: {
      title: string;
      description: string;
      thumbnail: string;
      videoUrl: string;
      category: string;
    }[];
  }[];
}

const HomePage: React.FC<HomePageProps> = async () => {
  /* const response = await fetchPayloadData('movies'); */
  const payload = await getPayloadHMR({ config: configPromise });
  const response = await payload.find({
    collection: 'movies',
    depth: 3,
    limit: 10,
  })
  const movies = response.docs.map((doc: any) => {
    const cardBlocks = doc.blocks.filter((block: any) => block.blockType === 'card-blocks');
    const videoBlocks = doc.blocks.filter((block: any) => block.blockType === 'video-blocks');

    return {
      title: doc.title,
      cardBlocks: cardBlocks.map((block: any) => ({
        title: block.title,
        description: block.description,
        thumbnail: block.thumbnail.url,
        videoUrl: block.videoUrl,
        category: block.category,
      })),
      videoBlocks: videoBlocks.map((block: any) => ({
        title: block.title,
        description: block.description,
        videoUrl: block.videoUrl,
        thumbnail: block.thumbnail.url,
        publishedAt: block.publishedAt,
        qualities: block.qualities,
        subtitles: block.subtitles,
      })),
    };
  });

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie, index) => (
        <Card key={index} {...movie.cardBlocks[0]} />
      ))}
    </div>
  );
};

export default HomePage;
