import { describe, it, beforeEach, expect } from "vitest";

import { MetadataStorage } from "../metadata/storage";
import { SearchEntity } from "./search-index";

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
      name,
      target: Claz,
    });
  });

  it("uses class name if no name option", () => {
    @SearchEntity()
    class Claz {}

    expect(metadataStorage.getSearchEntities()).toContainEqual({
      name: Claz.name,
      target: Claz,
    });
  });
});
