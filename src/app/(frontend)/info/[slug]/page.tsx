import { getPayloadHMR } from '@payloadcms/next/utilities';
import React from 'react';
import configPromise from '@payload-config';

export const dynamic = 'force-static';
export const revalidate = 600;

interface Params {
  slug: string;
}

interface MetadataParams {
  params: Params;
}

interface Content {
  title: string;
  description: string;
  poster?: {
    url?: string;
    width?: number;
    height?: number;
    alt?: string;
  };
}

const Page = async ({ params }: { params: Params }) => {
  const payload = await getPayloadHMR({ config: configPromise });

  let moviesData: any = null;
  let seriesData: any = null;

  try {
    // Fetch data from 'movies' collection
    moviesData = await payload.find({
      collection: 'movies',
      where: {
        slug: { equals: params.slug },
      },
    });
  } catch (error) {
    console.error('Error fetching movies data:', error);
  }

  try {
    // Fetch data from 'episodes' collection
    seriesData = await payload.find({
      collection: 'series',
      where: {
        slug: { equals: params.slug },
      },
      depth: 3,
    });
  } catch (error) {
    console.error('Error fetching series data:', error);
  }

  // Combine data from both collections
  const combinedData = {
    movies: moviesData?.docs || [],
    series: seriesData?.docs || [],
  };

  return (
    <div>
      <pre>{JSON.stringify(combinedData, null, 2)}</pre>
    </div>
  );
};

export default Page;




export const generateMetadata = async ({ params }: MetadataParams) => {
  const { slug } = params;
  const payload = await getPayloadHMR({ config: configPromise });

  let content: Content | null = null;

  try {
    const response = await payload.find({
      collection: 'movies',
      where: {
        slug: { equals: slug },
      },
    });

    const movieData = response?.docs?.[0] || null;

    // Check if movie data is available
    if (movieData) {
      content = {
        title: movieData.title + ` | Chikiimass` || 'Untitled Movie',
        description: movieData.description?.length < 150
          ? `${movieData.description} Learn more on Chikiimass.`
          : movieData.description || 'No description available.',
        poster: movieData.poster || {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/icon.png`,
          width: 1200,
          height: 630,
          alt: 'Default movie poster image',
        },
      };
    } else {
      // If no movie data, attempt to find series data
      const seriesResponse = await payload.find({
        collection: 'series',
        where: {
          slug: { equals: slug },
        },
      });

      const seriesData = seriesResponse?.docs?.[0] || null;

      if (seriesData) {
        content = {
          title: seriesData.name + ` | Chikiimass` || 'Untitled Series',
          description: seriesData.description?.length < 150
            ? `${seriesData.description} Learn more on Chikiimass.`
            : seriesData.description || 'No description available.',
          poster: seriesData.poster || {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/icon.png`,
            width: 1200,
            height: 630,
            alt: 'Default series poster image',
          },
        };
      }
    }
  } catch (error) {
    console.error('Error fetching content data:', error);
  }

  // Fallback to default values if content is not found
  const title = content?.title || 'Default Title';
  const description = content?.description || 'Default description available.';
  const image = content?.poster?.url || `${process.env.NEXT_PUBLIC_SITE_URL}/icon.png`;
  const imageWidth = content?.poster?.width || 1200;
  const imageHeight = content?.poster?.height || 630;
  const imageAlt = content?.poster?.alt || 'Default poster image';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/video/${slug}`,
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
      type: 'video.movie',
      site_name: 'Chikiimass',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image,
    },
  };
};
