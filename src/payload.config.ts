// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

/* collections */
import { Casts, Categories, Episodes, Genres, media, Movies, Notifications, Pages, Series, Users } from './payload/collections'


/* plugings */
import { s3Storage as s3StoragePlugin } from '@payloadcms/storage-s3'
import { resendAdapter } from '@payloadcms/email-resend'
import { S3_PLUGIN_CONFIG } from './payload/plugins/s3'
import { COLLECTION_SLUG_MEDIA } from './payload/collections/config'
import { en } from 'payload/i18n/en'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()]
  }),

  cors: ['https://checkout.stripe.com', 'https://chikiimass.me', 'https://www.chikiimass.me', `${process.env.NEXT_PUBLIC_SITE_URL}` || ''],
  csrf: ['https://checkout.stripe.com', 'https://chikiimass.me', 'https://www.chikiimass.me', process.env.NEXT_PUBLIC_SITE_URL || ''],
  collections: [Users, media, Notifications, Categories, Genres, Casts, Movies, Pages, Series, Episodes],
  secret: process.env.AUTH_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
/*   db: sqliteAdapter({
    client: {
      url: process.env.SQLDATABASE_URI || 'file:/chikiimass.db'
    }
  }), */
  /*db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || ''
    }
  }),*/
  sharp,
  email:
    process.env.RESEND_DEFAULT_EMAIL && process.env.AUTH_RESEND_KEY
      ? resendAdapter({
        defaultFromAddress: process.env.RESEND_DEFAULT_EMAIL,
        defaultFromName: 'Chikiimass Admin',
        apiKey: process.env.AUTH_RESEND_KEY || ''
      })
      : undefined,
  i18n: {
    supportedLanguages: { en }
  },
  plugins: [
    s3StoragePlugin({
      ...S3_PLUGIN_CONFIG,
      collections: {
        [COLLECTION_SLUG_MEDIA]: {
          disableLocalStorage: true,
          generateFileURL: (args: any) => {
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.prefix}/${args.filename}`
          },
          prefix: process.env.NEXT_PUBLIC_UPLOAD_PREFIX || 'media'
        }
      }
    }),
  ],
})
