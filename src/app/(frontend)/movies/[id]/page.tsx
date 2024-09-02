import React from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import Card from '@/components/Card';
import { fetchPayloadData } from '@/utils/payloadAPI';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config'

interface MoviePageProps {
  params: { id: string };
}

const MoviePage: React.FC<MoviePageProps> = async ({ params }) => {
  const { id } = params;
  const payload = await getPayloadHMR({ config: configPromise });
  const response = await payload.findByID({
    collection: 'movies',
    id: id,
    depth: 3,
  })
  const movie = {
    title: response.title,
    description: response.blocks[0]?.description || '',
    thumbnail: response.blocks[0]?.thumbnail?.url || '',
    releaseDate: response.createdAt,
    videoBlocks: response.blocks.filter((block: any) => block.blockType === 'video-blocks').map((block: any) => ({
      title: block.title,
      description: block.description,
      videoUrl: block.videoUrl,
      thumbnail: block.thumbnail.url,
      publishedAt: block.publishedAt,
      qualities: block.qualities,
      subtitles: block.subtitles,
    })),
    cardBlocks: response.blocks.filter((block: any) => block.blockType === 'card-blocks').map((block: any) => ({
      title: block.title,
      description: block.description,
      thumbnail: block.thumbnail.url,
      videoUrl: block.videoUrl,
      category: block.category,
    })),
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="text-gray-600">{movie.description}</p>
        <img src={movie.thumbnail} alt={movie.title} className="w-full h-auto mt-4" />
        <p className="text-gray-400">Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
      </div>
      <div className="mb-8">
        {movie.videoBlocks.map((block, index) => (
          <VideoPlayer key={index} {...block} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movie.cardBlocks.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
