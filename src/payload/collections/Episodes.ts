import { CollectionConfig } from 'payload';

const Episodes: CollectionConfig = {
  slug: 'episodes',
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
      name: 'episodeNumber',
      type: 'number',
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
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'releaseDate',
      type: 'date',
    },
    {
      name: 'video',
      type: 'text',
    },
    {
      name: 'series',
      type: 'relationship',
      relationTo: 'series',
      required: true,
    },
  ],
};

export default Episodes;
