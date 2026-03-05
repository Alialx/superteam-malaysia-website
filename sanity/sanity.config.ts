import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schema } from "./schema";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

if (!projectId || !dataset) {
  // These environment variables are required when running the Sanity Studio.
  throw new Error(
    "Missing SANITY_PROJECT_ID or SANITY_DATASET environment variables.",
  );
}

export default defineConfig({
  name: "superteam-malaysia",
  title: "Superteam Malaysia",
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool()],
});

