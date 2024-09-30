import { CollectionConfig } from 'payload';
import { blocksField } from '@/payload/fields/blocks'
import { COLLECTION_SLUG_CASTS } from '../config';
import { revalidateMovie } from './hooks/revalidateMovie';

export const Movies: CollectionConfig = {
  slug: 'movies',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      index: true
    },
    {
      name: 'releaseDate',
      type: 'date',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'duration',
      type: 'text',
    },
    {
      name: 'Casts',
      type: 'relationship',
      relationTo: [COLLECTION_SLUG_CASTS],
      index: true
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'type',
      type: 'text',
      defaultValue: 'movies',
      admin: {
        readOnly: true,
      }
    },
    blocksField(),
    {
        name: 'publishedAt',
        type: 'date',
        admin: {
            date: {
                pickerAppearance: 'dayAndTime',
            },
            position: 'sidebar',
        },
        hooks: {
            beforeChange: [
                ({ siblingData, value }) => {
                    if (siblingData._status === 'published' && !value) {
                        return new Date()
                    }
                    return value
                },
            ],
        },
    },
  ],
  hooks: {
    afterChange: [revalidateMovie],
    beforeValidate: [
      async ({ data }) => {
        // Ensure data exists and that we have a title but no slug yet
        if (data?.title && !data.slug) {
          // Generate the slug from the title if it does not exist
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/(^-|-$)+/g, '');   // Remove leading or trailing hyphens
        }
      }
    ],
  },
};