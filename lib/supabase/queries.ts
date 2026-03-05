import type { Member } from "@/types/member";
import { getSupabaseServerClient } from "./server";

export async function getMembers(): Promise<Member[]> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("members")
    .select(
      [
        "id",
        "full_name",
        "slug",
        "role",
        "company",
        "avatar_url",
        "twitter_handle",
        "github_handle",
        "website_url",
        "bio",
        "tags",
        "created_at",
      ].join(","),
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch members: ${error.message}`);
  }

  return data ?? [];
}

