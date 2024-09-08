import { Block } from 'payload';

const VideoBlock: Block = {
  slug: 'video-block',
  labels: {
    singular: 'Video Block',
    plural: 'Video Blocks',
  },
  fields: [
    {
      name: 'videos',
      label: 'Videos',
      type: 'array',
      fields: [
        {
          name: 'videoQuality',
          label: 'Video Quality',
          type: 'select',
          options: [
            {
              label: '720p',
              value: '720p',
            },
            {
              label: '1080p',
              value: '1080p',
            },
            {
              label: '4K',
              value: '4k',
            },
          ],
          required: true,
        },
        {
          name: 'videoLink',
          label: 'Video Link',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitles',
          label: 'Subtitles',
          type: 'array',
          fields: [
            {
              name: 'language',
              label: 'Language',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'Subtitle File URL',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default VideoBlock;
