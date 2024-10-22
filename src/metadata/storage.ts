import "reflect-metadata";

import type { Class } from "src/common/class";
import type { SearchEntityOpts } from "src/common/search-entity-options";
import type { SearchFieldOpts } from "src/common/search-field-options";

export type MetadataEntity = {
  target: Class<unknown>;
  options: SearchEntityOpts;
};

export type MetadataField = {
  target: Class<unknown>;
  propertyKey: string | symbol;
  options: SearchFieldOpts;
};

export class MetadataStorage {
  private readonly entities: MetadataEntity[] = [];
  private readonly fields: MetadataField[] = [];

  public getSearchEntities(): MetadataEntity[] {
    return this.entities;
  }

  public findSearchEntity(
    entityCls: Class<unknown>,
  ): MetadataEntity | undefined {
    return this.entities.find((e) => e.target === entityCls);
  }

  public findSearchEntityFields(
    entityCls: Class<unknown>,
  ): MetadataField[] | undefined {
    const entityMeta = this.entities.find((e) => e.target === entityCls);
    if (!entityMeta) {
      return entityMeta;
    }
    return this.fields.filter((f) => f.target === entityCls);
  }

  public addSearchEntity(
    target: Class<unknown>,
    options: SearchEntityOpts,
  ): void {
    this.entities.push({ target, options });
  }

  public getSearchFields(): MetadataField[] {
    return this.fields;
  }

  public addSearchField(
    target: Class<unknown>,
    propertyKey: string | symbol,
    options: SearchFieldOpts,
  ): void {
    this.fields.push({ target, propertyKey, options });
  }
}
