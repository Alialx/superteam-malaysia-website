import { defineField, defineType } from 'sanity'

export const skillType = defineType({
  name: 'skill',
  title: 'Member Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: { title: 'name' }
  }
})