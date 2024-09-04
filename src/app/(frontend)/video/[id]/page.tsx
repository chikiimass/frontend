import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import VideoPage from './page.client';

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

  return (
    <div>
      {combinedContent.map((item, index) => (
        <VideoPage key={index} data={item} id={id}/>
      ))}
    </div>
  );
};

export default page;
