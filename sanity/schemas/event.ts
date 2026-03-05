import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "start_at",
      title: "Start time",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "end_at",
      title: "End time",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "luma_url",
      title: "Luma event URL",
      type: "url",
      description: "Link to the Luma event page.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "portableText",
    }),
    defineField({
      name: "hosts",
      title: "Hosts",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "member" }],
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Past", value: "past" },
          { title: "Draft", value: "draft" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
    },
  },
});

