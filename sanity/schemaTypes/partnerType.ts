import { defineField, defineType } from 'sanity'

export const partnerType = defineType({
  name: 'ecosystemPartner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'row',
      title: 'Row',
      type: 'number',
      description: '1 = top row, 2 = bottom row',
      validation: Rule => Rule.required().min(1).max(2)
    }),
    defineField({
      name: 'order',
      title: 'Order within row',
      type: 'number',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'name', media: 'logo', subtitle: 'row' }
  }
})