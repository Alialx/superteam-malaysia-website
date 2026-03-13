import { defineField, defineType } from 'sanity'

export const statType = defineType({
  name: 'stat',
  title: 'Statistics Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'value',
      title: 'Number Value',
      type: 'number',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'prefix',
      title: 'Prefix',
      type: 'string',
      description: 'e.g. $, RM,  leave empty if none',
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'e.g. k, +, can be k+, leave empty if none',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  
  preview: {
    select: { title: 'label', subtitle: 'value' }
  },
})