import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  })

  console.log('Sanity Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Sanity Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)