import type { MappingProperty } from "@elastic/elasticsearch/lib/api/types";

export type SearchFieldOpts = {
  name?: string;
  mapping?: Partial<MappingProperty>;
};
