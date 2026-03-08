import { defineField, defineType } from 'sanity'

export const badgeType = defineType({
  name: 'badge',
  title: 'Badge',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Badge Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icon (emoji or symbol)',
      type: 'string',
      description: 'e.g. ⚡ or ◈'
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'icon' }
  }
})