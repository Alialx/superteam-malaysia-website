import { type SchemaTypeDefinition } from "sanity";

import { landing } from "./schemas/landing";
import { member } from "./schemas/member";
import { event } from "./schemas/event";
import { portableText } from "./schemas/shared/portableText";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portableText, landing, member, event],
};

