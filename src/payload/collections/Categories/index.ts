import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_CATEGORIES } from '../config'

export const Categories: CollectionConfig = {
  slug: COLLECTION_SLUG_CATEGORIES,
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}