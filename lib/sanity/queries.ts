import { sanityClient } from "./client";

export type LandingTestimonial = {
  quote: string;
  name: string;
  title?: string;
};

export type LandingFeatureSection = {
  heading?: string;
  body?: unknown;
};

export type LandingPage = {
  _id: string;
  title: string;
  heroTitle: string;
  heroSubtitle?: string | null;
  heroCtaLabel?: string | null;
  heroCtaHref?: string | null;
  featureSections: LandingFeatureSection[];
  testimonials: LandingTestimonial[];
  ctaTitle?: string | null;
  ctaBody?: unknown;
};

export type MemberMetadata = {
  _id: string;
  full_name: string;
  slug: string;
  role?: string | null;
  company?: string | null;
  twitter_handle?: string | null;
  github_handle?: string | null;
  website_url?: string | null;
  tags?: string[] | null;
  supabase_member_id?: string | null;
};

export type EventDocument = {
  _id: string;
  title: string;
  slug: string;
  start_at: string;
  end_at?: string | null;
  location?: string | null;
  luma_url?: string | null;
  status?: "upcoming" | "past" | "draft";
};

export async function getLandingPage(): Promise<LandingPage | null> {
  const query = `
    *[_type == "landing"][0]{
      _id,
      title,
      heroTitle,
      heroSubtitle,
      heroCtaLabel,
      heroCtaHref,
      featureSections[]{
        heading,
        body
      },
      testimonials[]{
        quote,
        name,
        title
      },
      ctaTitle,
      ctaBody
    }
  `;

  return sanityClient.fetch<LandingPage | null>(query);
}

export async function getMemberMetadata(): Promise<MemberMetadata[]> {
  const query = `
    *[_type == "member"]{
      _id,
      full_name,
      "slug": slug.current,
      role,
      company,
      twitter_handle,
      github_handle,
      website_url,
      tags,
      supabase_member_id
    }
  `;

  return sanityClient.fetch<MemberMetadata[]>(query);
}

export async function getEvents(): Promise<EventDocument[]> {
  const query = `
    *[_type == "event" && status != "draft"] | order(start_at desc){
      _id,
      title,
      "slug": slug.current,
      start_at,
      end_at,
      location,
      luma_url,
      status
    }
  `;

  return sanityClient.fetch<EventDocument[]>(query);
}

export async function getEventBySlug(
  slug: string,
): Promise<(EventDocument & { description?: unknown }) | null> {
  const query = `
    *[_type == "event" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      start_at,
      end_at,
      location,
      luma_url,
      status,
      description
    }
  `;

  return sanityClient.fetch(query, { slug });
}

