import { sanityClient } from './client'
import { groq } from 'next-sanity'

export interface SanityLogo {
  _id: string
  name: string
  logo: string
  href?: string
  displayOrder: number
}

export interface SanitySkill {
  _id: string
  name: string
}

export interface SanityMember {
  _id: string
  name: string
  role: string
  company: string
  avatar: string
  twitter: string
  skills: SanitySkill[]
  achievements: {
    icon: string
    title: string
    description: string
    year: string
  }[]
  isFeatured: boolean
  displayOrder: number
}

export interface SanityImageCard {
  _id: string
  title: string
  image: string
  displayOrder: number
}

export interface SanityFAQ {
  _id: string
  question: string
  answer: string
  displayOrder: number
}

export interface SanityStat {
  _id: string
  label: string
  value: number
  prefix?: string 
  suffix?: string  
}

export interface SanityPartner {
  _id: string
  name: string
  url?: string
  row: number
  order: number
  logoUrl: string
  logoType: string
}

export interface SanityPerson {
  _key: string
  name: string
  initials: string
  avatarColor?: string
}
 
export interface SanityAward {
  _key: string
  label: string
  tier: 'gold' | 'silver' | 'default'
  date?: string
}
 
export interface SanityProject {
  _id: string
  title: string
  slug: string
  tag: string
  description: string
  imageUrl?: string
  href: string
  people: SanityPerson[]
  awards?: SanityAward[]
  order?: number
}

export interface SanityGalleryImage {
  _key: string
  imageUrl: string
  alt?: string
}

export interface SanityGallery {
  _id: string
  title: string
  images: SanityGalleryImage[]
}

export const galleryQuery = groq`
  *[_type == "gallery"][0] {
    _id,
    title,
    images[] {
      _key,
      "imageUrl": image.asset->url,
      alt,
    },
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    tag,
    description,
    "imageUrl": image.asset->url,
    href,
    people[] {
      _key,
      name,
      initials,
      avatarColor,
    },
    awards[] {
      _key,
      label,
      tier,
      date,
    },
    order,
  }
`
 
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    tag,
    description,
    "imageUrl": image.asset->url,
    href,
    people[] {
      _key,
      name,
      initials,
      avatarColor,
    },
    awards[] {
      _key,
      label,
      tier,
      date,
    },
    order,
  }
`
const MEMBERS_QUERY = `*[_type == "member"] | order(displayOrder asc) {
  _id,
  name,
  role,
  company,
  "avatar": avatar.asset->url,
  twitter,
  "skills": skills[]-> { _id, name },
  achievements,
  isFeatured,
  displayOrder
}`

const FEATURED_MEMBERS_QUERY = `*[_type == "member" && isFeatured == true] | order(displayOrder asc) {
  _id,
  name,
  role,
  company,
  "avatar": avatar.asset->url,
  twitter,
  "skills": skills[]-> { _id, name },
  achievements,
  isFeatured,
  displayOrder
}`

const SKILLS_QUERY = `*[_type == "skill"] | order(name asc) {
  _id,
  name
}`

const IMAGE_CARDS_QUERY = `*[_type == "imageCard"] | order(displayOrder asc) {
  _id,
  title,
  "image": image.asset->url + "?w=600&h=320&fit=crop&q=75&auto=format",
  displayOrder
}`

const FAQ_QUERY = `*[_type == "faq"] | order(displayOrder asc) {
  _id,
  question,
  answer,
  displayOrder
}`

const STATS_QUERY = `*[_type == "stat"] | order(displayOrder asc) {
  _id,
  label,
  value,
  suffix,
  icon,
}`

const LOGO_QUERY = `*[_type == "logo" && isActive == true] | order(displayOrder asc) {
  _id,
  name,
  "logo": logo.asset->url + "?auto=format",
  href,
  displayOrder
}`

const PARTNERS_QUERY = `*[_type == "ecosystemPartner" && isActive == true] | order(row asc, order asc) {
  _id,
  name,
  "logoUrl": logo.asset->url + "?auto=format",
  "logoType": logo.asset->extension,
  url,
  row,
  order
}`


export async function getAllMembers(): Promise<SanityMember[]> {
  return sanityClient.fetch(MEMBERS_QUERY)
}

export async function getFeaturedMembers(): Promise<SanityMember[]> {
  return sanityClient.fetch(FEATURED_MEMBERS_QUERY)
}

export async function getAllSkills(): Promise<SanitySkill[]> {
  return sanityClient.fetch(SKILLS_QUERY)
}

export async function getImageCards(): Promise<SanityImageCard[]> {
  return sanityClient.fetch(IMAGE_CARDS_QUERY)
}

export async function getFAQs(): Promise<SanityFAQ[]> {
  return sanityClient.fetch(FAQ_QUERY, {}, { next: { revalidate: 3600 } })
}

export async function getStats(): Promise<SanityStat[]> {
  return sanityClient.fetch(STATS_QUERY)
}

export async function getLogos(): Promise<SanityLogo[]> {
  return sanityClient.fetch(LOGO_QUERY)
}

export async function getPartners(): Promise<SanityPartner[]> {
  return sanityClient.fetch(PARTNERS_QUERY)
}

export async function getProjects(): Promise<SanityProject[]> {
  return sanityClient.fetch<SanityProject[]>(projectsQuery)
}

export async function getGallery(): Promise<SanityGallery | null> {
  return sanityClient.fetch<SanityGallery | null>(galleryQuery)
}

export function mapSanityMember(member: SanityMember, index: number) {
  return {
    id: index,
    name: member.name,
    role: member.role ?? '',
    company: member.company ?? '',
    avatar: member.avatar ?? '',
    twitter: member.twitter ?? '',
    skills: member.skills?.map((s) => s.name) ?? [],
    achievements: member.achievements ?? [],
    isFeatured: member.isFeatured ?? false,
  }
}

export function mapSanityMembers(members: SanityMember[]) {
  return members.map(mapSanityMember)
}
