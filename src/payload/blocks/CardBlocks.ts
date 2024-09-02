// src/blocks/CardBlock.ts
import { Block } from 'payload';

const CardBlock: Block = {
  slug: 'card-block',
  fields: [
    {
      name: 'series',
      type: 'relationship',
      relationTo: 'series',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          const seriesData = data.series;
          
          if (seriesData) {
            // Auto-generate card details using series data
            data.title = seriesData.title;
            data.thumbnail = seriesData.thumbnail;
            data.duration = seriesData.duration;
            data.views = seriesData.views;
            data.time = seriesData.time;
          }
        }
      },
    ],
  },
};

export default CardBlock;
