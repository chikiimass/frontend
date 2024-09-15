import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import VideoPage from './page.client';

export const dynamic = 'force-static';
export const revalidate = 600;

const page = async ({ params }) => {
  const { id } = params;
  const payload = await getPayloadHMR({ config: configPromise });

  // Try to fetch from the 'movies' collection
  let movieContent;
  try {
    movieContent = await payload.findByID({
      collection: 'movies',
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
console.log('data', combinedContent)
  return (
    <div>
      {combinedContent.map((item, index) => (
        <VideoPage key={index} data={item} id={id}/>
      ))}
    </div>
  );
};

export default page;

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const payload = await getPayloadHMR({ config: configPromise });

  let movieContent;
  let seriesContent;

  try {
    movieContent = await payload.findByID({ collection: 'movies', id });
  } catch {
    movieContent = null;
  }

  try {
    seriesContent = await payload.findByID({ collection: 'episodes', id });
  } catch {
    seriesContent = null;
  }

  const combinedContent = [movieContent, seriesContent].filter(Boolean);

  if (combinedContent.length === 0) return {};

  const content = combinedContent[0]; // assuming you want the first valid content

  const { title, description, thumbnail, poster } = content;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://yourdomain.com/video/${id}`, // Make sure this URL is correct
      images: [
        {
          url: thumbnail?.url || poster?.url,
          width: thumbnail?.width || poster?.width,
          height: thumbnail?.height | poster?.height,
          alt: thumbnail?.alt || poster?.alt,
        },
      ],
      type: 'video.movie',
      site_name: 'YourSiteName',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: thumbnail?.url || poster?.url,
    },
  };
};
