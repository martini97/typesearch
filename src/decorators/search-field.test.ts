import "reflect-metadata";
import { describe, it, beforeEach, expect } from "vitest";

import { MetadataStorage } from "src/metadata/storage";

import { SearchEntity } from "./search-entity";
import { SearchField } from "./search-field";

describe("SearchField", () => {
  let metadataStorage: MetadataStorage;

  beforeEach(() => {
    metadataStorage = new MetadataStorage();
    global.metadataStorage = metadataStorage;
  });

  it("decorates field", () => {
    @SearchEntity()
    class Claz {
      @SearchField({ mapping: { type: "keyword" } })
      public id!: string;

      @SearchField()
      public name!: string;

      @SearchField({ name: "created_at" })
      public createdAt!: Date;
    }

    expect(metadataStorage.getSearchFields()).toContainEqual({
      target: Claz,
      propertyKey: "id",
      options: {
        mapping: { type: "keyword" },
        name: "id",
      },
    });

    expect(metadataStorage.getSearchFields()).toContainEqual({
      target: Claz,
      propertyKey: "name",
      options: {
        mapping: { type: "text" },
        name: "name",
      },
    });

    expect(metadataStorage.getSearchFields()).toContainEqual({
      target: Claz,
      propertyKey: "createdAt",
      options: {
        mapping: { type: "date" },
        name: "created_at",
      },
    });
  });
});
