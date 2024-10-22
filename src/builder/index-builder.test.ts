import { describe, it, beforeEach, expect } from "vitest";
import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";
import type { IndicesCreateRequest } from "@elastic/elasticsearch/lib/api/types";

import { MetadataStorage } from "src/metadata/storage";
import { SearchEntity } from "src/decorators/search-entity";
import { SearchField } from "src/decorators/search-field";

import { IndexBuilder } from "./index-builder";

describe("IndexBuilder", () => {
  let metadataStorage: MetadataStorage;

  beforeEach(() => {
    metadataStorage = new MetadataStorage();
    global.metadataStorage = metadataStorage;
  });

  it("builds index", () => {
    @SearchEntity({ name: "claz-index", settings: { number_of_replicas: 2 } })
    @Entity()
    class Claz {
      @SearchField()
      @PrimaryColumn()
      public id!: string;

      @SearchField()
      @Column()
      public name!: string;

      @SearchField({ name: "bigint" })
      @Column({ type: "bigint" })
      public numericBigInt!: number;

      @SearchField({ name: "float", mapping: { type: "float" } })
      @Column({ type: "float" })
      public numericFloat!: number;

      @SearchField({ name: "number" })
      @Column({ type: "number" })
      public numericNumber!: number;

      @SearchField({ name: "numeric" })
      @Column({ type: "numeric" })
      public numericNumeric!: number;

      @SearchField({ name: "created_at", mapping: { format: "yyyy-MM-dd" } })
      @CreateDateColumn()
      public createdAt!: Date;

      @SearchField({ name: "updated_at" })
      @UpdateDateColumn()
      public updatedAt?: Date;
    }

    expect(
      new IndexBuilder(metadataStorage).build(Claz),
    ).toEqual<IndicesCreateRequest>({
      index: "claz-index",
      settings: { number_of_replicas: 2 },
      mappings: {
        properties: {
          id: { type: "keyword" },
          name: { type: "text" },
          created_at: { type: "date", format: "yyyy-MM-dd" },
          updated_at: { type: "date" },
          bigint: { type: "long" },
          float: { type: "float" },
          number: { type: "double" },
          numeric: { type: "double" },
        },
      },
    });
  });
});
