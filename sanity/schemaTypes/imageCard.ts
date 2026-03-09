import { defineField, defineType } from 'sanity'

export const imageCardType = defineType({
  name: 'imageCard',
  title: 'Image Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' }
  },
  orderings: [{
    title: 'Display Order',
    name: 'displayOrderAsc',
    by: [{ field: 'displayOrder', direction: 'asc' }]
  }]
})