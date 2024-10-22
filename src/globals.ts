import { MetadataStorage } from "src/metadata/storage";
import { IndexBuilder } from "src/builder/index-builder";

export function getMetadataStorage(): MetadataStorage {
  if (!global.metadataStorage) {
    global.metadataStorage = new MetadataStorage();
  }
  return global.metadataStorage;
}

export function getIndexBuilder(): IndexBuilder {
  return new IndexBuilder(getMetadataStorage());
}
