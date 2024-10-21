/* eslint-disable @typescript-eslint/no-extraneous-class */

import { describe, it, beforeEach, expect } from "vitest";

import { MetadataStorage } from "src/metadata/storage";
import { SEARCH_INDEX_KEY } from "src/constants";

import { SearchEntity } from "./search-entity";

describe("SearchEntity", () => {
  let metadataStorage: MetadataStorage;

  beforeEach(() => {
    metadataStorage = new MetadataStorage();
    global.metadataStorage = metadataStorage;
  });

  it("decorates entity", () => {
    const name = "search-entity-index";

    @SearchEntity({ name })
    class Claz {}

    expect(metadataStorage.getSearchEntities()).toContainEqual({
      target: Claz,
      options: { name, settings: {} },
    });
  });

  it("uses class name if no name option", () => {
    @SearchEntity()
    class Claz {}

    expect(metadataStorage.getSearchEntities()).toContainEqual({
      target: Claz,
      options: { name: Claz.name, settings: {} },
    });
  });

  it("injects metadata", () => {
    const name = "search-entity-index";
    const settings = { number_of_replicas: 2, number_of_shards: 2 };

    @SearchEntity({ name, settings })
    class Claz {}

    expect(Reflect.getMetadata(SEARCH_INDEX_KEY, Claz)).toEqual({
      name,
      settings,
    });
  });
});
