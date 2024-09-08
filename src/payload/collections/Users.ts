import { PrimaryActionEmailHtml } from '@/components/email/PrimaryActionHtml';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
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
      required: true,
      defaultValue: 'upload',
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
  ],
};
