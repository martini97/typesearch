import type {
  IndicesCreateRequest,
  MappingProperty,
  MappingTypeMapping,
} from "@elastic/elasticsearch/lib/api/types";

import type { Class } from "src/common/class";
import { isObjEmpty } from "src/common/is-object-empty";
import * as errors from "src/exceptions";
import type {
  MetadataEntity,
  MetadataField,
  MetadataStorage,
} from "src/metadata/storage";

type MappingProps = NonNullable<MappingTypeMapping["properties"]>;

function getIndexName(entity: MetadataEntity): string | null {
  if (entity.options.name) return entity.options.name;
  if (entity.target.name) return entity.target.name;
  return null;
}

function getFieldName(field: MetadataField): string | null {
  if (field.options.name) return field.options.name;
  if (typeof field.propertyKey === "string") return field.propertyKey;
  return null;
}

export class IndexBuilder {
  constructor(private readonly metadataStorage: MetadataStorage) {}

  private getEntityMappings(entityCls: Class<unknown>): MappingTypeMapping {
    const fields = this.metadataStorage.findSearchEntityFields(entityCls);
    if (!fields || fields.length < 1) {
      throw new errors.CouldNotFindMetadata(entityCls);
    }

    const properties = fields.reduce<MappingProps>((props, field) => {
      const name = getFieldName(field);
      if (!name) {
        throw new errors.CouldNotFindFieldName(entityCls, field.propertyKey);
      }
      if (isObjEmpty(field.options.mapping) || !field.options.mapping?.type) {
        throw new errors.CouldNotFindFieldMapping(entityCls, field.propertyKey);
      }
      const mapping = field.options.mapping as NonNullable<MappingProperty>;
      return { ...props, [name]: mapping };
    }, {});
    return { properties };
  }

  build(entityCls: Class<unknown>): IndicesCreateRequest {
    const meta = this.metadataStorage.findSearchEntity(entityCls);
    if (!meta) {
      throw new errors.CouldNotFindMetadata(entityCls);
    }
    const index = getIndexName(meta);
    if (!index) {
      throw new errors.CouldNotFindEntityName(entityCls);
    }
    return {
      index,
      settings: meta.options.settings,
      mappings: this.getEntityMappings(entityCls),
    };
  }
}
