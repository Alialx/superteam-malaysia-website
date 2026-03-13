import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Featured Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Short category label, e.g. "AI / ML" or "Infrastructure"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'href',
      title: 'Project URL',
      type: 'url',
      description: 'Where the card links to — GitHub, live demo, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'people',
      title: 'People Involved',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Full Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'initials',
              title: 'Initials',
              type: 'string',
              description: 'e.g. AK — shown in the avatar circle',
              validation: (Rule) => Rule.required().max(3),
            }),
            defineField({
              name: 'avatarColor',
              title: 'Avatar Color',
              type: 'string',
              description: 'Hex color, e.g. #3C2B8C',
              initialValue: '#3C2B8C',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'initials' },
          },
        },
      ],
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. 🥇 HackMIT 2024 — Best AI Tool',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tier',
              title: 'Tier',
              type: 'string',
              options: {
                list: [
                  { title: '🥇 Gold', value: 'gold' },
                  { title: '🥈 Silver', value: 'silver' },
                  { title: 'Default', value: 'default' },
                ],
                layout: 'radio',
              },
              initialValue: 'default',
            }),
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              description: 'When this award was won',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'tier' },
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest First',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tag',
      media: 'image',
    },
  },
})