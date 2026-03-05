import { defineField, defineType } from "sanity";

export const member = defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({
      name: "full_name",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "full_name",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "twitter_handle",
      title: "Twitter handle",
      type: "string",
    }),
    defineField({
      name: "github_handle",
      title: "GitHub handle",
      type: "string",
    }),
    defineField({
      name: "website_url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "portableText",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "supabase_member_id",
      title: "Supabase member ID",
      type: "string",
      description:
        "Optional: link this Sanity document to a member row in Supabase.",
    }),
  ],
  preview: {
    select: {
      title: "full_name",
      subtitle: "role",
      media: "avatar",
    },
  },
});

