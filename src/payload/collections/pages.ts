// src/collections/Pages.ts
import { CollectionConfig } from 'payload';
import CardBlock from '@/payload/blocks/CardBlocks';

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        CardBlock,
      ],
    },
  ],
};

export default Pages;
