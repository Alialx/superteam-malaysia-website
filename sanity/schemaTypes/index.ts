import { type SchemaTypeDefinition } from 'sanity'
import { skillType } from './skillType'
import { memberType } from './memberType'
import { faqType } from './faqType'
import { statType } from './statType'
import { partnerType } from './partnerType'
import { projectType } from './projectType'
import { galleryType } from './galleryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [memberType, skillType, faqType, statType, partnerType, projectType, galleryType]
}