import { PrimaryActionEmailHtml } from '@/components/email/PrimaryActionHtml';
import type { CollectionConfig } from 'payload';
import { COLLECTION_SLUG_SESSIONS, COLLECTION_SLUG_USER } from './config';
import { isAdminOrCurrentUser, isAdmin } from '../access';

const ADMIN_AUTH_GROUP = 'Auth'

export const Users: CollectionConfig = {
  slug: COLLECTION_SLUG_USER,
  admin: {
    group: ADMIN_AUTH_GROUP,
    useAsTitle: 'email',
  },
  access: {
    read: isAdminOrCurrentUser,
    create: isAdmin,
    update: isAdminOrCurrentUser,
    delete: isAdminOrCurrentUser
  },
  auth: true,
  /*   auth: {
      forgotPassword: {
        generateEmailHTML: (arg) => {
          const token = arg?.token || "";
  
          return PrimaryActionEmailHtml({
            actionLabel: "reset your password",
            buttonText: "Reset Password",
            href: `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`,
          });
        },
      }, 
      verify: {
        generateEmailHTML: ({ token }) => {
          return PrimaryActionEmailHtml({
            actionLabel: "verify your account",
            buttonText: "Verify Account",
            href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}`,
          });
        },
      },
    },*/
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
    },
    {
      name: 'role',
      type: 'select',
      options: [
        'admin',
        'user',
        'premium'
      ],
      defaultValue: 'user',
      saveToJWT: true
    },
    {
      name: 'verificationTokens',
      type: 'array',
      saveToJWT: false,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'identifier',
              type: 'text',
              admin: {
                readOnly: true
              }
            },
            {
              name: 'token',
              type: 'text',
              admin: {
                readOnly: true
              }
            },
            {
              name: 'expires',
              type: 'date',
              admin: {
                readOnly: true
              }
            }
          ]
        }
      ]
    }
  ],
} as const;

export const sessions: CollectionConfig = {
  slug: COLLECTION_SLUG_SESSIONS,
  admin: {
    group: ADMIN_AUTH_GROUP
  },
  access: {
    read: isAdminOrCurrentUser,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_USER,
      required: true,
      admin: {
        readOnly: false
      }
    },
    {
      name: 'sessionToken',
      type: 'text', required: true,
      index: true,
      admin: {
        readOnly: false
      }
    },
    {
      name: 'expires',
      type: 'date',
      admin: {
        readOnly: false,
        date: { pickerAppearance: 'dayAndTime' }
      },
      required: false
    }
  ]
} as const
