import { CollectionConfig } from 'payload';
import { blocksField } from '../fields/blocks';

const Movies: CollectionConfig = {
  slug: 'movies',
  labels: {
    singular: 'Movie',
    plural: 'Movies',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'updatedAt', 'createdAt']
  },
  access: {
    read: () => true,    // Consider limiting public read access if needed
    create: () => true,  // Consider restricting creation to authenticated users
    update: () => true,  // Consider restricting updates to content owners
    delete: () => true,  // Consider restricting deletion to admins or content owners
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Movie Details',  // Renamed for clarity
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title',  // Added label for better admin panel UI
              required: true,  // Marked as required to ensure a title is always provided
            },
            blocksField(),  // Assuming blocksField is a custom field for rich content
          ],
        },
      ],
    },
  ],
};

export default Movies;
