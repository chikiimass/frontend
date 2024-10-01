import { CollectionConfig } from "payload";

const Test: CollectionConfig = {
  slug: "test",
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
        name: 'video',
        type: 'ui',
        admin: {
            components: {
                Field: '/payload/component/Video',
            }
        }
    }
  ],
};

export default Test