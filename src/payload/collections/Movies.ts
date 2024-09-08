import { CollectionConfig } from 'payload';
import { blocksField } from '@/payload/fields/blocks'

const Movies: CollectionConfig = {
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
    },
    {
      name: 'releaseDate',
      type: 'date',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'duration',
      type: 'text',
    },
    blocksField(),
  ],
  hooks: {
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

export default Movies;
