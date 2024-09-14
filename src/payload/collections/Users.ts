import { PrimaryActionEmailHtml } from '@/components/email/PrimaryActionHtml';
import { CollectionConfig } from 'payload';
import { COLLECTION_SLUG_USER } from './config';
import { isAdminOrCurrentUser, isAdmin } from '../access';



export const Users: CollectionConfig = {
  slug: COLLECTION_SLUG_USER,
  admin: {
    useAsTitle: 'email',
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
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {

          return PrimaryActionEmailHtml({
              actionLabel: 'Welcome to the newsletter!',
              href: `${doc.name ? `Hi ${doc.name}!` : 'Hi!'} We'll be in touch soon...`,
              buttonText: ''
            })
        }
      },
    ],
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (arg) => {
        const token = arg?.token || '';

        return PrimaryActionEmailHtml({
          actionLabel: 'Reset your password',
          buttonText: 'Reset Password',
          href: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}`,
        });
      },
    },
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: 'Verify your account',
          buttonText: 'Verify Account',
          href: `${process.env.NEXT_PUBLIC_SITE_URL}/verify?token=${token}`,
        });
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'The full name of the user.',
      },
    },
    {
      name: 'iconType',
      type: 'select',
      options: [
        { label: 'Upload Image', value: 'upload' },
        { label: 'URL', value: 'url' },
      ],
      defaultValue: 'url',
      admin: {
        description: 'Choose whether to upload an image or provide a URL for the icon.',
      },
    },
    {
      name: 'iconUpload',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data.iconType === 'upload',
        description: 'Upload the icon image here if "Upload Image" is selected above.',
      },
    },
    {
      name: 'iconUrl',
      type: 'text',
      admin: {
        condition: (data) => data.iconType === 'url',
        placeholder: 'https://example.com/icon.png',
      },
      defaultValue: 'https://pub-2af5a0856a4a42c3b267a44f15493caf.r2.dev/chikiimass/media/chikiimass-removebg-preview(1).png',
    },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user'],
      defaultValue: 'user',
      saveToJWT: true,
    },
  ],
};
