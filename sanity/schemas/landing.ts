import { defineField, defineType } from "sanity";

export const landing = defineType({
  name: "landing",
  title: "Landing page",
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
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      description: "Main headline for the hero section.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 3,
      description: "Supporting copy shown below the hero title.",
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero primary CTA label",
      type: "string",
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero primary CTA href",
      type: "url",
    }),
    defineField({
      name: "featureSections",
      title: "Feature sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "featureSection",
          title: "Feature section",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            {
              name: "body",
              type: "portableText",
              title: "Body",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          name: "testimonial",
          title: "Testimonial",
          fields: [
            { name: "quote", type: "text", title: "Quote" },
            { name: "name", type: "string", title: "Name" },
            { name: "title", type: "string", title: "Title / Role" },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaTitle",
      title: "Final CTA title",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "Final CTA body",
      type: "portableText",
    }),
  ],
});

