import type { IndicesIndexSettings } from "@elastic/elasticsearch/lib/api/types";

export type SearchEntityOpts = {
  name?: string;
  settings?: IndicesIndexSettings;
};
