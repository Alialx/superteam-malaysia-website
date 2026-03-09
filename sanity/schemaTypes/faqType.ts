import { defineField, defineType } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'answer' }
  },
  orderings: [{
    title: 'Display Order',
    name: 'displayOrderAsc',
    by: [{ field: 'displayOrder', direction: 'asc' }]
  }]
})