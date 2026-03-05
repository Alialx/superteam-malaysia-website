import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { sanityConfig } from "./client";

let _builder: ImageUrlBuilder | null = null;

function getBuilder(): ImageUrlBuilder {
  if (_builder) return _builder;
  _builder = imageUrlBuilder({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
  });
  return _builder;
}

export function urlForImage(source: SanityImageSource) {
  return getBuilder().image(source);
}

