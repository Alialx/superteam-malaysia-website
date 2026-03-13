"use client";

import dynamic from "next/dynamic";

const TwitterGrid = dynamic(() => import("@/components/TwitterGrid"), { ssr: false });

export default function TwitterFeedWrapper() {
  return <TwitterGrid />;
}