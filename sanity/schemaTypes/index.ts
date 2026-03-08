import { type SchemaTypeDefinition } from 'sanity'
import {postType} from './postType'
import { badgeType } from './badgeType'
import { skillType } from './skillType'
import { memberType } from './memberType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [memberType, badgeType, skillType, postType],
}