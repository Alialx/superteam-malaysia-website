import { type SchemaTypeDefinition } from 'sanity'
import { skillType } from './skillType'
import { memberType } from './memberType'
import { imageCardType } from './imageCard'
import { faqType } from './faqType'
import { statType } from './statType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [memberType, skillType, imageCardType, faqType, statType],
}