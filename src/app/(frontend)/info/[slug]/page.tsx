import { getPayloadHMR } from '@payloadcms/next/utilities';
import React from 'react';
import configPromise from '@payload-config';
import ContentPage from './page.client';

export const dynamic = 'force-static';
export const revalidate = 600;

interface Params {
  slug: string;
}

interface MetadataParams {
  params: Params;
}

interface MovieData {
  [key: string]: {
    bannerUrl: string;
    moviePosterUrl: string;
    movieName: string;
    description: string;
    parts: Array<{
      id: string;
      title: string;
      thumbnailUrl: string;
    }>;
    cast: Array<{
      id: string;
      name: string;
      role: string;
      profilePic: string;
    }>;
  };
}

interface SeriesData {
  [key: string]: {
    bannerUrl: string;
    seriesPicUrl: string;
    seriesName: string;
    description: string;
    seasons: Array<{
      id: string;
      title: string;
      seasonN: any;
      episodes: Array<{
        id?: string;
        seriesSlug?: string;
        slug?: string;
        poster?: { url: string };
        thumbnail?: { url: string };
        title?: string;
        name?: string;
        duration?: string;
        views?: number;
        createdAt?: string;
        icon?: { url: string } | null;
        blocks?: { videos?: { videoQuality?: string; videoLink?: string; subtitles?: { url?: string }[] }[] }[];
      }>;
    }>;
    cast: Array<{
      id: string;
      name: string;
      role: string;
      profilePic: string;
    }>;
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
    // Fetch data from 'series' collection
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

  // Transform movies data to the desired format
  const transformMoviesData = (data: any): MovieData => {
    const movies = data?.docs || [];

    return movies.reduce((acc: MovieData, movie: any) => {
      acc[movie.slug] = {
        bannerUrl: movie.icon?.url || 'https://via.placeholder.com/1920x1080.png?text=Banner+Image',
        moviePosterUrl: movie.poster?.url || 'https://via.placeholder.com/720x1080.png?text=Movie+Poster',
        movieName: movie.title || 'Unknown Movie',
        description: movie.description || 'No description available.',
        parts: Array.isArray(movie.blocks) ? movie.blocks.map((part: any) => ({
          id: part.id || 'placeholder-part-id',
          title: part.title || 'Unknown Part',
          thumbnailUrl: part.thumbnailUrl || 'https://via.placeholder.com/300x300.png?text=Part+Thumbnail',
        })) : [], // Default to empty array if blocks is not an array
        cast: Array.isArray(movie.Casts?.value) ? movie.Casts.value.map((cast: any) => ({
          id: cast.id || 'placeholder-cast-id',
          name: cast.name || 'Unknown Actor',
          role: cast.role || 'Unknown Role',
          profilePic: cast.profilePic || 'https://via.placeholder.com/100x100.png?text=Profile+Picture',
        })) : [], // Default to empty array if Casts.value is not an array
      };
      return acc;
    }, {});
  };

  // Transform series data to the desired format
const transformSeriesData = (data: any): SeriesData => {
  const series = data?.docs?.[0] || {};

  return {
    [series.slug || 'placeholder-id']: {
      bannerUrl: series.poster?.url || 'https://via.placeholder.com/1920x1080.png?text=Banner+Image',
      seriesPicUrl: series.poster?.url || 'https://via.placeholder.com/720x1080.png?text=Series+Picture',
      seriesName: series.name || 'Unknown Series',
      description: series.description || 'No description available.',
      seasons: series.seasons?.map((season: any) => ({
        id: season.id || 'placeholder-season-id',
        seasonNumber: season.seasonNumber || 'Unknown Season Number',
        title: season.seasonDesc || 'Unknown Season Description',
        episodes: Array.isArray(season.episodes)
          ? season.episodes.map((episode: any) => {
              const episodeData = episode?.value || {};
              return {
                id: episodeData.id || 'placeholder-episode-id',
                title: episodeData.title || 'Unknown Episode',
                thumbnailUrl: episodeData.thumbnail?.url || 'https://via.placeholder.com/300x300.png?text=Episode+Thumbnail',
                description: episodeData.description || 'No description available.',
                episodeNumber: episodeData.episodeNumber || 'Unknown Episode Number',
                relationTo: episode.relationTo || 'Unknown Relation',
                blocks: episodeData.blocks || [], // Include the blocks array if it exists
                releaseDate: episodeData.releaseDate || 'Unknown Release Date',
                seriesSlug: episodeData.seriesSlug || 'Unknown Series Slug',
                views: episodeData.views || 0, // Default to 0 views if not provided
                type: episodeData.type || 'Unknown Type',
              };
            })
          : [], // Default to empty array if episodes is not an array
      })) || [],
      cast: Array.isArray(series.Casts?.value)
        ? series.Casts.value.map((cast: any) => ({
            id: cast.id || 'placeholder-cast-id',
            name: cast.name || 'Unknown Actor',
            role: cast.role || 'Unknown Role',
            profilePic: cast.profilePic || 'https://via.placeholder.com/100x100.png?text=Profile+Picture',
          }))
        : [], // Default to empty array if Casts.value is not an array
    },
  };
};

  const combinedData = {
    movies: transformMoviesData(moviesData || {}),
    series: transformSeriesData(seriesData || {}),
  };

  return (
    <div>
      <ContentPage data={combinedData} slug={params.slug} />
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
