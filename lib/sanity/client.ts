import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const useCdn = process.env.NODE_ENV === "production";
const token = process.env.SANITY_READ_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Sanity client is not configured. Please set SANITY_PROJECT_ID and SANITY_DATASET environment variables.",
  );
}

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
};

export const sanityClient = createClient({
  ...sanityConfig,
  token,
  perspective: "published",
});

