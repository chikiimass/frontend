import axios from 'axios';
import { Metadata } from 'next';

// Function to fetch user data from /api/users/me using axios
async function fetchUserData() {
  try {
    // Ensure the absolute URL is used for server-side requests
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`, {
      withCredentials: true,
    });

    // The response data will be in res.data
    return res.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; // Return null in case of error
  }
}

// Generate Metadata for User or Fallback for Visitors
export async function generateMetadata(): Promise<Metadata> {
  const userData = await fetchUserData();
/*   console.log('user data', userData); */

  if (userData?.user) {
    const { name, iconUrl, role } = userData.user;
    const title = `${name} - Profile`;
    const description = `${name}'s profile as an ${role} on our platform.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings/profile`,
        type: 'profile',
        images: [
          {
            url: iconUrl || 'https://pub-2af5a0856a4a42c3b267a44f15493caf.r2.dev/chikiimass/media/chikiimass-removebg-preview(1).png',
            width: 800,
            height: 600,
            alt: `${name}'s profile picture`,
          },
        ],
        siteName: 'Your Website Name',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [iconUrl || 'https://pub-2af5a0856a4a42c3b267a44f15493caf.r2.dev/chikiimass/media/chikiimass-removebg-preview(1).png'],
      },
    };
  }

  // Fallback metadata for visitors
  const title = 'Visitor - Profile';
  const description = 'Welcome, visitor!';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/visitors`,
      type: 'website',
      images: [
        {
          url: 'https://pub-2af5a0856a4a42c3b267a44f15493caf.r2.dev/chikiimass/media/chikiimass-removebg-preview(1).png',
          width: 800,
          height: 600,
          alt: 'Default visitor image',
        },
      ],
      siteName: 'chikiimass',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://pub-2af5a0856a4a42c3b267a44f15493caf.r2.dev/chikiimass/media/chikiimass-removebg-preview(1).png'],
    },
  };
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}