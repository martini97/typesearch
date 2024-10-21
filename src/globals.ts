import { MetadataStorage } from "src/metadata/storage";

export function getMetadataStorage(): MetadataStorage {
  if (!global.metadataStorage) {
    global.metadataStorage = new MetadataStorage();
  }
  return global.metadataStorage;
}
