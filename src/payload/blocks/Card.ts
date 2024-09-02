import { Block } from "payload";

const CardBlock: Block = {
  slug: 'card-blocks',
  labels: {
    singular: 'Card Block',
    plural: 'Card Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
    },
  ],
};

export default CardBlock;
