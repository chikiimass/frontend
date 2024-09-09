// src/collections/Pages.ts
import { CollectionConfig } from 'payload';
import CardBlock from '@/payload/blocks/CardBlocks';

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      name: 'blocks',
      type: 'blocks',
      blocks: [
        CardBlock,
      ],
    },
  ],
};
