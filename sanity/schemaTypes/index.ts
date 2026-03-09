import { type SchemaTypeDefinition } from 'sanity'
import { skillType } from './skillType'
import { memberType } from './memberType'
import { imageCardType } from './imageCard'
import { faqType } from './faqType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [memberType, skillType, imageCardType, faqType],
}