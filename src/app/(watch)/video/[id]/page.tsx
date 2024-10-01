import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import VideoPage from './page.client';
import { draftMode } from 'next/headers'

export const dynamic = 'force-static';
export const revalidate = 600;

const { draft, isEnabled} = draftMode()

const page = async ({ params }) => {
  const { id } = params;
  const payload = await getPayloadHMR({ config: configPromise });

  // Try to fetch from the 'movies' collection
  let movieContent;
  try {
    movieContent = await payload.findByID({
      collection: 'movies',
      depth: 3,
      draft,
      overrideAccess: draft,
      id: id,
    });
  } catch (error) {
    movieContent = null; // Handle case where the ID is not found in 'movies'
  }

  // Try to fetch from the 'episodes' collection
  let seriesContent;
  try {
    seriesContent = await payload.findByID({
      collection: 'episodes',
      depth: 3,
      draft,
      overrideAccess: draft,
      id: id,
    });
  } catch (error) {
    seriesContent = null; // Handle case where the ID is not found in 'episodes'
  }

  // Combine the content from both collections, ignoring null results
  const combinedContent = [];
  if (movieContent) {
    combinedContent.push(movieContent);
  }
  if (seriesContent) {
    combinedContent.push(seriesContent);
  }

  // Handle case where the ID is not found in either collection
  if (combinedContent.length === 0) {
    return (
      <div>
        <h1>No content found</h1>
      </div>
    );
  }

  
  return (
    <div>
      {combinedContent.map((item, index) => (
        <VideoPage key={index} data={item} id={id} />
      ))}
    </div>
  );
};

export default page;

interface MetadataParams {
  params: {
    id: string;
  };
}

interface Content {
  title: string;
  description: string;
  thumbnail?: {
    url?: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  poster?: {
    url?: string;
    width?: number;
    height?: number;
    alt?: string;
  };
}

const formatDescription = (description: string): string => {
  const minLength = 150;
  const maxLength = 160;
  let formattedDescription = description;

  if (description.length < minLength) {
    formattedDescription = `${description} Check more on Chikiimass.`;
  } else if (description.length > maxLength) {
    formattedDescription = `${description.substring(0, maxLength - 3)}...`;
  }

  return formattedDescription;
};

export const generateMetadata = async ({ params }: MetadataParams) => {
  const { id } = params;
  const payload = await getPayloadHMR({ config: configPromise });

  let movieContent: Content | null = null;
  let seriesContent: Content | null = null;

  try {
    movieContent = await payload.findByID({ collection: 'movies', id });
  } catch {
    // Log or handle error if needed
  }

  try {
    seriesContent = await payload.findByID({ collection: 'episodes', id });
  } catch {
    // Log or handle error if needed
  }

  const combinedContent: Content[] = [movieContent, seriesContent].filter(Boolean) as Content[];

  if (combinedContent.length === 0) return {};

  const content = combinedContent[0]; // Assuming you want the first valid content

  const { title, description, thumbnail, poster } = content;

  let defaultTitle = title || 'Untitled';
  const defaultDescription = description || 'Enjoy the videos and music you love, and share it all with friends, family, and the world on ChikiiMass.';
  if (seriesContent) {
  const seriesName = (seriesContent as any).seriesName; // Assuming the field name is `seriesName`
  const season = (seriesContent as any).season; // Assuming the field name is `season`
  
  if (seriesName && season) {
    defaultTitle = `${seriesName} S${season} - ${title}`;
  }
}

  const adjustedTitle = defaultTitle.length < 30 ? `${defaultTitle} - Chikiimass` : defaultTitle;
  const adjustedDescription = formatDescription(defaultDescription);

  return {
    title: adjustedTitle,
    description: adjustedDescription,
    openGraph: {
      title: adjustedTitle,
      description: adjustedDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/video/${id}`, // Ensure this URL is correct
      images: [
        {
          url: thumbnail?.url || poster?.url || `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`, // Fallback image URL
          width: thumbnail?.width || poster?.width || 1200,
          height: thumbnail?.height || poster?.height || 630,
          alt: thumbnail?.alt || poster?.alt || 'Default image alt text', // Default alt text
        },
      ],
      type: 'video.movie',
      site_name: 'Chikiimass',
      locale: 'en_US',
      audio: {
        url: 'https://yourdomain.com/audio.mp3', // Example additional metadata
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: adjustedTitle,
      description: adjustedDescription,
      image: thumbnail?.url || poster?.url || `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`, // Fallback image URL
    },
  };
};
