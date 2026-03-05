export type Member = {
  id: string;
  full_name: string;
  slug: string;
  role: string | null;
  company: string | null;
  avatar_url: string | null;
  twitter_handle: string | null;
  github_handle: string | null;
  website_url: string | null;
  bio: string | null;
  tags: string[] | null;
  created_at: string;
};

