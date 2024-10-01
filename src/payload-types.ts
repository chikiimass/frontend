/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    notifications: Notification;
    categories: Category;
    test: Test;
    genres: Genre;
    casts: Cast;
    movies: Movie;
    pages: Page;
    series: Series;
    episodes: Episode;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name?: string | null;
  iconType?: ('upload' | 'url') | null;
  iconUpload?: (string | null) | Media;
  iconUrl?: string | null;
  role?: ('admin' | 'user') | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  title?: string | null;
  alt?: string | null;
  rawContent?: string | null;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notifications".
 */
export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  link?: string | null;
  linkText?: string | null;
  dismissible?: boolean | null;
  reappearAfter?: number | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "test".
 */
export interface Test {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "genres".
 */
export interface Genre {
  id: string;
  name: string;
  options?:
    | (
        | 'action'
        | 'adventure'
        | 'comedy'
        | 'drama'
        | 'fantasy'
        | 'historical'
        | 'horror'
        | 'mystery'
        | 'romance'
        | 'science-fiction'
        | 'thriller'
        | 'western'
      )
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "casts".
 */
export interface Cast {
  id: string;
  name: string;
  bio?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  photo?: (string | null) | Media;
  roleInMovies?:
    | {
        movie: string | Movie;
        role: string;
        id?: string | null;
      }[]
    | null;
  roleInSeries?:
    | {
        series: string | Series;
        role: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "movies".
 */
export interface Movie {
  id: string;
  title: string;
  slug: string;
  icon?: (string | null) | Media;
  poster?: (string | null) | Media;
  releaseDate?: string | null;
  description?: string | null;
  duration?: string | null;
  Casts?: {
    relationTo: 'casts';
    value: string | Cast;
  } | null;
  views?: number | null;
  type?: string | null;
  blocks?:
    | (
        | {
            videos?:
              | {
                  platform?: ('youtube' | 'dailymotion' | 'vimeo' | 'twitch' | 'facebook' | 'custom') | null;
                  embedType?: ('iframe' | 'direct') | null;
                  videoQuality?:
                    | ('144p' | '280p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '4k' | '8k' | 'auto')
                    | null;
                  videoLink?: string | null;
                  subtitles?:
                    | {
                        language?: string | null;
                        url?: string | null;
                        id?: string | null;
                      }[]
                    | null;
                  captions?:
                    | {
                        language?: string | null;
                        url?: string | null;
                        id?: string | null;
                      }[]
                    | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'video-block';
          }
        | {
            title: string;
            description?: string | null;
            thumbnail?: (string | null) | Media;
            videoUrl?: string | null;
            category?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'card-blocks';
          }
      )[]
    | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "series".
 */
export interface Series {
  id: string;
  name: string;
  slug: string;
  poster?: (string | null) | Media;
  releaseDate: string;
  description?: string | null;
  Casts?:
    | {
        relationTo: 'casts';
        value: string | Cast;
      }[]
    | null;
  Category?:
    | {
        relationTo: 'categories';
        value: string | Category;
      }[]
    | null;
  Genres?:
    | {
        relationTo: 'genres';
        value: string | Genre;
      }[]
    | null;
  seasons?:
    | {
        seasonNumber: number;
        seasonDesc?: string | null;
        episodes?:
          | {
              relationTo: 'episodes';
              value: string | Episode;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "episodes".
 */
export interface Episode {
  id: string;
  title: string;
  episodeNumber: number;
  description?: string | null;
  duration?: string | null;
  thumbnail?: (string | null) | Media;
  blocks?:
    | (
        | {
            videos?:
              | {
                  platform?: ('youtube' | 'dailymotion' | 'vimeo' | 'twitch' | 'facebook' | 'custom') | null;
                  embedType?: ('iframe' | 'direct') | null;
                  videoQuality?:
                    | ('144p' | '280p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '4k' | '8k' | 'auto')
                    | null;
                  videoLink?: string | null;
                  subtitles?:
                    | {
                        language?: string | null;
                        url?: string | null;
                        id?: string | null;
                      }[]
                    | null;
                  captions?:
                    | {
                        language?: string | null;
                        url?: string | null;
                        id?: string | null;
                      }[]
                    | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'video-block';
          }
        | {
            title: string;
            description?: string | null;
            thumbnail?: (string | null) | Media;
            videoUrl?: string | null;
            category?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'card-blocks';
          }
      )[]
    | null;
  releaseDate?: string | null;
  views?: number | null;
  type?: string | null;
  series?: (string | null) | Series;
  season?: number | null;
  seriesSlug?: string | null;
  seriesName?: string | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  blocks?:
    | {
        series: string | Series;
        id?: string | null;
        blockName?: string | null;
        blockType: 'card-block';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}