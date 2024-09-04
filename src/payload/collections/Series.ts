import { CollectionConfig } from 'payload';

const Series: CollectionConfig = {
  slug: 'series',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,    // Consider limiting public read access if needed
    create: () => true,  // Consider restricting creation to authenticated users
    update: () => true,  // Consider restricting updates to content owners
    delete: () => true,  // Consider restricting deletion to admins or content owners
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      required: true,
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
      name: 'seasons',
      type: 'array',
      fields: [
        {
          name: 'seasonNumber',
          type: 'number',
          required: true,
        },
        {
          name: 'episodes',
          type: 'relationship',
          relationTo: 'episodes',
          hasMany: true,
        },
      ],
    },
  ],
};

export default Series;
