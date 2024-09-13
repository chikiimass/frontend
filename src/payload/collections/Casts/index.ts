import { CollectionConfig } from 'payload';
import { COLLECTION_SLUG_CASTS } from '../config';
import { isAdmin } from '@/payload/access';

export const Casts: CollectionConfig = {
    slug: COLLECTION_SLUG_CASTS,
    access: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
        read: isAdmin,
    },
    labels: {
        singular: 'Cast Member',
        plural: 'Cast Members',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Name',
        },
        {
            name: 'role',
            type: 'text',
            label: 'Role',
        },
        {
            name: 'bio',
            type: 'richText',
            label: 'Biography',
        },
        {
            name: 'photo',
            type: 'upload',
            relationTo: 'media',
            label: 'Photo',
        },
        {
            name: 'movies',
            type: 'relationship',
            relationTo: 'movies',
            hasMany: true,
            label: 'Movies',
        },
        {
            name: 'series',
            type: 'relationship',
            relationTo: 'series',
            hasMany: true,
            label: 'Series',
        },
    ],
};
