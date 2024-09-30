'use client';
import React, { useEffect, useState } from 'react';
import { Avatar } from '../Avatar';
import LazyLoadedImage from '../LazyLoadingImage';
import { cmTimeAgo } from '@/utils/time-ago';
import { cmAbbreviateNumber } from '@/utils/views';
import { useVideoPlayer } from '@/context/VideoPlayerContext';
import styles from './video-thumbnail.module.scss';
import Title from '../Title';
import Link from 'next/link';

interface CardProps {
  data: {
    id?: string;
    seriesSlug?: string;
    seriesName?: string;
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
  };
}

export const dynamic = 'force-static';
export const revalidate = 600;


const CardBlock: React.FC<CardProps> = ({ data }) => {
  const { video, minimized } = useVideoPlayer();
  const isPlaying = video?.id === data.id && minimized;


  const [imageLoaded, setImageLoaded] = useState(false);


  const firstName = data.title?.split(' ')[0] || data.name?.split(' ')[0] || 'User';
  const imageSrc = data.poster?.url || data.thumbnail?.url || '/images/chikiimass-placeholder.jpg';
  const videoUrl = data.id ? `/video/${data.id}` : '#';
  const infoUrl = data.seriesSlug 
  ? `/info/${data.seriesSlug}` 
  : data.slug 
  ? `/info/${data.slug}` 
  : '#';
  const duration = data.duration || 'N/A';
  const views = data.views !== undefined ? cmAbbreviateNumber(data.views) : '0';
  const createdAt = data.createdAt ? cmTimeAgo(data.createdAt) : 'Unknown';
  const iconSrc = data.icon?.url || data.thumbnail?.url || '/images/chikiimass.jpeg';

  return (
    <div className="group relative vi">
      <Link title={`${data.title || data.name || 'Untitled'}`} href={videoUrl}>
        <div className="relative">
          {!imageLoaded && (
            <div className="h-52 w-full bg-gray-500 rounded-md" />
          )}
          <LazyLoadedImage
            image={imageSrc}
            name={data.title || data.name || 'Untitled'}
            className={`h-64 w-full rounded-md aspect-video object-cover ${imageLoaded ? '' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />
          {isPlaying && (
            <div className={styles.nowPlayingOverlay}>
              <div className={`mat-subtitle-1 ${styles.nowPlayingOverlay__text}`}>Now Playing</div>
              <div className={styles.nowPlayingOverlay__equalizer}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <rect className={`${styles.eqBar} ${styles['eqBar--1']}`} x="0" y="4" width="4" height="8" />
                  <rect className={`${styles.eqBar} ${styles['eqBar--2']}`} x="6" y="4" width="4" height="16" />
                  <rect className={`${styles.eqBar} ${styles['eqBar--3']}`} x="12" y="4" width="4" height="11" />
                </svg>
              </div>
            </div>
          )}
          <span className="absolute bottom-2 right-2 rounded-sm bg-black opacity-[0.72] px-1 text-sm text-white">{duration}</span>
        </div>
        <div className="mt-2 pl-4 flex items-start">
          <Link title={data.seriesName || data.name || 'Untitled'} href={infoUrl} className="flex-shrink-0">
            <Avatar
              image={iconSrc || imageSrc}
              name={firstName}
              className="h-14 w-14 dark:bg-zinc-700 flex-shrink-0"
            />
          </Link>
          <div className="ml-4 flex-1 min-w-0">
            <Title text={data.title || 'Untitled'} />
            <div className="flex items-center mt-2 text-gray-600 text-xs sm:text-sm">
              <div className="text-xs text-gray-500">
                <span>{views} views • </span>
                <span>{createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardBlock;