import { defineField, defineType } from 'sanity'

export const memberType = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',        // e.g. "Full-Stack Dev"
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',        // e.g. "Freelance"
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },   // lets you crop focal point
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter / X Handle',
      type: 'string',        // store as "@handle"
      validation: Rule => Rule.required()
    }),
    defineField({
        name: 'skills',
        title: 'Skills',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'skill' }] }],
      }),
      defineField({
        name: 'badges',
        title: 'Badges',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'badge' }] }],
      }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon',        title: 'Icon (emoji)',   type: 'string' }),
            defineField({ name: 'title',       title: 'Title',          type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'description', title: 'Description',    type: 'text',   rows: 2 }),
            defineField({ name: 'year',        title: 'Year',           type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'year', media: 'icon' },
          }
        }
      ]
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Member',
      type: 'boolean',
      description: 'Show this member in the spotlight section on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }]
    },
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    }
  ]
})