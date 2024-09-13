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
    read: isAdminOrCurrentUser,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
/*   hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        // Check if the _verified field has changed from false to true
        if (!previousDoc?._verified && doc._verified) {
          const email = doc.email;

          // Generate welcome email HTML
          const welcomeEmailHtml = PrimaryActionEmailHtml({
            actionLabel: "Welcome to Our Platform!",
            buttonText: "Get Started",
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/sign-in`, // Example link for getting started
          });

          // Send welcome email logic here (you'll need to implement your email sending function)
          await payload.sendEmail({
            to: email,
            subject: 'Welcome to Our Platform!',
            html: welcomeEmailHtml,
          });
        }
      },
    ],
  }, */
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
