import { sanityClient } from './client'

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
  suffix?: string
  icon?: string
}

// QUERIES
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