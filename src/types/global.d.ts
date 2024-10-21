/* eslint-disable no-var */
export {};

import type { MetadataStorage } from "src/metadata/storage";

declare global {
  var metadataStorage: MetadataStorage | undefined;
}
