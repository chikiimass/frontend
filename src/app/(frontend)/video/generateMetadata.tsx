import { Metadata } from "next";
export const generateMetadata: Metadata = (data) => {
    if (!data) return {};
  
    const { title, description, thumbnail, seriesName, releaseDate } = data;
  
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://yourdomain.com/video/${data.id}`, // Change this to your actual video URL
        images: [
          {
            url: thumbnail?.url,
            width: thumbnail?.width,
            height: thumbnail?.height,
            alt: thumbnail?.alt,
          },
        ],
        type: 'video.movie',
        site_name: 'YourSiteName',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        image: thumbnail?.url,
      },
    };
  };
  