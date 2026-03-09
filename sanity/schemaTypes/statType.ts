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
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'e.g. +, K, M — leave empty if none',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name e.g. Users, FileText, Settings',
      options: {
        list: [
          { title: 'Users', value: 'Users' },
          { title: 'FileText', value: 'FileText' },
          { title: 'Settings', value: 'Settings' },
          { title: 'UsersRound', value: 'UsersRound' },
          { title: 'DollarSign', value: 'DollarSign' },
          { title: 'Trophy', value: 'Trophy' },
          { title: 'Globe', value: 'Globe' },
          { title: 'Zap', value: 'Zap' },
        ]
      }
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