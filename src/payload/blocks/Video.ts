import { Block } from "payload";

const VideoBlock: Block = {
  slug: 'video-blocks',
  labels: {
    singular: 'Video Block',
    plural: 'Video Blocks',
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
      name: 'videoUrl',
      type: 'text',
      required: true,
      label: 'Video URL',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
    },
    {
      name: 'qualities',
      type: 'array',
      label: 'Video Qualities',
      fields: [
        {
          name: 'quality',
          type: 'text',
          label: 'Quality',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
    {
      name: 'subtitles',
      type: 'array',
      label: 'Subtitles',
      fields: [
        {
          name: 'language',
          type: 'text',
          label: 'Language',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
  ],
};

export default VideoBlock;
