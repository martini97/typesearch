import "reflect-metadata";
import { describe, it, beforeEach, expect } from "vitest";

import { MetadataStorage } from "src/metadata/storage";
import { SEARCH_FIELD_KEY } from "src/constants";

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
      entity: Claz,
      target: expect.anything(),
      propertyKey: "id",
      options: {
        mapping: { type: "keyword" },
        name: "id",
      },
    });

    expect(metadataStorage.getSearchFields()).toContainEqual({
      entity: Claz,
      target: expect.anything(),
      propertyKey: "name",
      options: {
        mapping: { type: "text" },
        name: "name",
      },
    });

    expect(metadataStorage.getSearchFields()).toContainEqual({
      entity: Claz,
      target: expect.anything(),
      propertyKey: "createdAt",
      options: {
        mapping: { type: "date" },
        name: "created_at",
      },
    });
  });

  it("injects metadata", () => {
    @SearchEntity()
    class Claz {
      @SearchField({ mapping: { type: "keyword" } })
      public id!: string;

      @SearchField()
      public name!: string;

      @SearchField({ name: "created_at" })
      public createdAt!: Date;
    }

    expect(Reflect.getMetadata(SEARCH_FIELD_KEY, new Claz(), "id")).toEqual({
      mapping: { type: "keyword" },
      name: "id",
    });
    expect(Reflect.getMetadata(SEARCH_FIELD_KEY, new Claz(), "name")).toEqual({
      mapping: { type: "text" },
      name: "name",
    });
    expect(
      Reflect.getMetadata(SEARCH_FIELD_KEY, new Claz(), "createdAt"),
    ).toEqual({
      mapping: { type: "date" },
      name: "created_at",
    });
  });
});
