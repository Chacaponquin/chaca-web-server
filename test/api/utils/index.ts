export const COMPLETE_SCHEMA = {
  // string field declaration
  id: "id.uuid",

  // string field decalartion with arguments
  age: "dataType.integer<min=18;max=90>",

  // array field config
  posts: {
    type: "id.uuid",
    isArray: {
      min: 1,
      max: 10,
    },
  },

  // nested schema field config
  socialMedia: {
    type: "schema",
    params: {
      facebook: "internet.url",
      instagram: "internet.url",
    },
  },
};
