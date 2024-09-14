import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './global.css'
import Header from '@/components/Header'
import BottomTab from '@/components/BottomTab'
import { Suspense } from 'react'
import SideBar from '@/components/Sidebar'
import { VideoPlayerProvider } from '@/context/VideoPlayerContext'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SocialBar from '@/components/Ads/Banner/Social'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ClientThemeWrapper from '@/contexts/ClientWrapper'

export const metadata: Metadata = {
  title: 'Home | Chikiimass',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  description: 'Enjoy the videos and music you love, and share it all with friends, family, and the world on ChikiiMass.',
  generator: 'Chikiimass',
  applicationName: 'Chikiimass',
  referrer: 'origin-when-cross-origin',
  keywords: ['Chikiimass', 'tv', 'live tv', 'video', 'sharing', 'camera phone', 'video phone', 'free', 'upload'],
  authors: [{ name: 'chikii' }, { name: 'mass', url: 'https://hooleymass.dev' }],
  creator: 'ChikiiMass',
  publisher: 'Chikiimass',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    card: 'app',
    title: 'Chikiimass',
    description: 'Enjoy the videos and music you love, and share it all with friends, family, and the world on ChikiiMass.',
    siteId: '',
    creator: '@chikiimass',
    creatorId: '',
    images: {
      url: 'https://pub-2af5a0856a4a42c3b267a44f15493caf.r2.dev/chikiimass/media/chikiimass-removebg-preview(1).png',
      alt: 'chikiimass Logo'
    },
    app: {
      name: 'twitter_app',
      id: {
        iphone: 'twitter_app://iphone',
        ipad: 'twitter_app://ipad',
        googleplay: 'twitter_app://googleplay'
      },
      url: {
        iphone: 'https://iphone_url',
        ipad: 'https://ipad_url'
      }
    }
  },
  appLinks: {
    ios: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/apps`,
      app_store_id: 'app_store_id'
    },
    android: {
      package: 'com.example.android.package',
      app_name: 'Chikiimass'
    },
    web: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      should_fallback: true
    }
  },
  category: 'entertainment',
  verification: {
    google: process.env.GOOGLE_VERIFICATION || 'google',
    yahoo: process.env.YAHOO_VERIFICATION || 'yahoo',
    yandex: process.env.YANDEX_VERIFICATION || 'yandex',
    other: {
      me: ['chikiimass@gmail.com', `${process.env.NEXT_PUBLIC_SITE_URL}/components/chikiimass/.tech`]
    }
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || '/',
    media: {
      'only screen and (max-width: 600px)': process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/mobile` : '/'
    }
  }
};


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-5016990868345734" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <GoogleAnalytics />
      <SocialBar />
      <body>
        <Suspense>
          <Analytics />
          <SpeedInsights />
          <ThemeProvider>
          <ClientThemeWrapper>
          <VideoPlayerProvider>
            <div className="flex h-screen flex-col">
              <Header />

              <div className="flex flex-1 overflow-hidden">
                <SideBar />
                <main className="mb-10 flex-1 overflow-auto sm:mb-1">
                  {children}
                </main>
                <BottomTab />
              </div>
            </div>
          </VideoPlayerProvider>
          </ClientThemeWrapper>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}