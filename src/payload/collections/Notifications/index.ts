import { CollectionConfig } from 'payload';
import { revalidateNotification } from './hooks/revalidateNotification';

export const Notifications: CollectionConfig = {
  slug: 'notifications', // The URL to access this collection in the admin panel
  labels: {
    singular: 'Notification',
    plural: 'Notifications',
  },
  admin: {
    defaultColumns: ['message', 'type', 'dismissible', 'createdAt'], // Customize columns in admin UI
    useAsTitle: 'message',
    group: 'utils'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'message',
      type: 'text',
      required: true,
      label: 'Announcement Message',
    },
    {
      name: 'type',
      type: 'radio',
      required: true,
      label: 'Notification Type',
      options: [
        {
          label: 'Info',
          value: 'info',
        },
        {
          label: 'Warning',
          value: 'warning',
        },
        {
          label: 'Success',
          value: 'success',
        },
      ],
      defaultValue: 'info', // Default to 'info'
    },
    {
      name: 'link',
      type: 'text',
      label: 'External Link',
      admin: {
        description: 'Optional URL for the announcement (e.g., Telegram, Premium Page).',
      },
    },
    {
      name: 'linkText',
      type: 'text',
      label: 'Link Text',
      admin: {
        description: 'Text for the link (e.g., "Join Now").',
        condition: (_, siblingData) => siblingData.link, // Show only if link is provided
      },
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      label: 'Manually Dismissible',
      defaultValue: true, // Most announcements should be dismissible by default
    },
    {
      name: 'reappearAfter',
      type: 'number',
      label: 'Reappear After (in milliseconds)',
      admin: {
        description: 'Time in milliseconds for this notification to reappear after dismissal (e.g., 5 hours = 18000000 ms). Leave blank if not applicable.',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => (value ? value : undefined),
        ],
      },
    },
    {
        name: 'publishedAt',
        type: 'date',
        admin: {
            date: {
                pickerAppearance: 'dayAndTime',
            },
            position: 'sidebar',
        },
        hooks: {
            beforeChange: [
                ({ siblingData, value }) => {
                    if (siblingData._status === 'published' && !value) {
                        return new Date()
                    }
                    return value
                },
            ],
        },
    },
  ],
  hooks: {
    afterChange: [revalidateNotification],
  },
  versions: {
    drafts: {
        autosave: {
            interval: 100, // We set this interval for optimal live preview
        },
    },
    maxPerDoc: 50,
},
};