import { defineType } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Rich text",
  type: "array",
  of: [
    {
      type: "block",
    },
    {
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});

