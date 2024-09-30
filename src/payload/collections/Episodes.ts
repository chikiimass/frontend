import { CollectionConfig } from 'payload';
import { blocksField } from '../fields/blocks';

export const Episodes: CollectionConfig = {
  slug: 'episodes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
    admin: ({ req }) => {
      const { user } = req
      // Check if the user object and role exist
      if (user && user.role === 'admin') {
        return true;
      }
      return false;
    },
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
    blocksField(),
    {
      name: 'releaseDate',
      type: 'date',
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'type',
      type: 'text',
      defaultValue: 'series',
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'series',
      type: 'relationship',
      relationTo: 'series',
      index: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'season',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 1,
    },
    {
      name: 'seriesSlug',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'seriesName',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Fetch the related series information (slug and name) before saving the episode
        const seriesId = data.series;

        if (seriesId) {
          const series = await req.payload.findByID({
            collection: 'series',
            id: seriesId,
          });

          if (series) {
            data.seriesSlug = series.slug;
            data.seriesName = series.name;
          }

          // If there's no thumbnail for the episode, use the series poster as the thumbnail
/*           if (!data.thumbnail && series.poster) {
            data.thumbnail = series.poster;
          } */
        }
      },
    ],
  },
};
