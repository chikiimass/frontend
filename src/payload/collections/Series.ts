import { CollectionConfig } from 'payload';

const Series: CollectionConfig = {
  slug: 'series',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media', // Assuming you have a media collection for images
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
    },
    {
      name: 'views',
      type: 'number',
      required: true,
    },
    {
      name: 'time',
      type: 'date',
      required: true,
    },
  ],
};

export default Series;
