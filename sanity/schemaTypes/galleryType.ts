import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal label, e.g. "Hackathon 2024"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
          preview: {
            select: { media: 'image', title: 'alt' },
          },
        },
      ],
      validation: (Rule) => Rule.min(5).max(5).error('Must have exactly 5 images'),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})