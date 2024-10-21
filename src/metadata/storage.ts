import "reflect-metadata";

import type { Class } from "src/common/class";
import type { SearchEntityOpts } from "src/common/search-entity-options";
import type { SearchFieldOpts } from "src/common/search-field-options";
import { SEARCH_INDEX_KEY, SEARCH_FIELD_KEY } from "src/constants";

type MetadataEntity = {
  target: Class<unknown>;
  options: SearchEntityOpts;
};

type MetadataField = {
  entity: Class<unknown>;
  target: object;
  propertyKey: string | symbol;
  options: SearchFieldOpts;
};

export class MetadataStorage {
  private readonly entities: MetadataEntity[] = [];
  private readonly fields: MetadataField[] = [];

  public getSearchEntities(): MetadataEntity[] {
    return this.entities;
  }

  public addSearchEntity(
    target: Class<unknown>,
    options: SearchEntityOpts,
  ): void {
    this.entities.push({ target, options });
    Reflect.defineMetadata(SEARCH_INDEX_KEY, options, target);
  }

  public getSearchFields(): MetadataField[] {
    return this.fields;
  }

  public addSearchField(
    entity: Class<unknown>,
    target: object,
    propertyKey: string | symbol,
    options: SearchFieldOpts,
  ): void {
    this.fields.push({ entity, target, propertyKey, options });
    Reflect.defineMetadata(SEARCH_FIELD_KEY, options, target, propertyKey);
  }
}
