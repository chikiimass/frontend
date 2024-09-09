// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

/* collections */
import { Episodes, media, Movies, Pages, Series, sessions, Users } from './payload/collections'


/* plugings */
import { s3Storage as s3StoragePlugin } from '@payloadcms/storage-s3'
import { S3_PLUGIN_CONFIG } from './payload/plugins/s3'
import { COLLECTION_SLUG_MEDIA } from './payload/collections/config'

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

  cors: ['https://checkout.stripe.com', `${process.env.NEXT_PUBLIC_SITE_URL}` || ''],
  csrf: ['https://checkout.stripe.com', process.env.NEXT_PUBLIC_SITE_URL || ''],
  collections: [Users, sessions, media, Movies, Pages, Series, Episodes],
  secret: process.env.AUTH_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  sharp,
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
