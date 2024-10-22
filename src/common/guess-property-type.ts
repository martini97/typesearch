import { getMetadataArgsStorage, type ColumnType } from "typeorm";
import type { MappingProperty } from "@elastic/elasticsearch/lib/api/types";
import type { ColumnMetadataArgs } from "typeorm/metadata-args/ColumnMetadataArgs";
import type { ColumnMode } from "typeorm/metadata-args/types/ColumnMode";

import type { Class } from "src/common/class";
import * as errors from "src/exceptions";
import { getMetaType } from "src/common/get-meta-type";

type KeyType = string | symbol;
type PropType = MappingProperty["type"];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MetaType = StringConstructor | DateConstructor | any;

const LongTypes = new Set<ColumnType>(["bigint"]);
const DoubleTypes = new Set<ColumnType>(["float", "number", "numeric"]);
const TypeormDateModes = new Set<ColumnMode>([
  "deleteDate",
  "updateDate",
  "createDate",
]);

function isTypeFactory(
  metaType: MetaType,
  typeormMeta?: ColumnMetadataArgs,
): <T>(cls: Class<T>) => boolean {
  return <T>(cls: Class<T>) =>
    typeormMeta
      ? typeormMeta.options.type === (cls as unknown as ColumnType)
      : metaType === cls;
}

function isPrimaryKey(_: MetaType, typeormMeta?: ColumnMetadataArgs): boolean {
  return (typeormMeta && typeormMeta.options.primary) || false;
}

function isDate(metaType: MetaType, typeormMeta?: ColumnMetadataArgs): boolean {
  return (
    metaType === Date ||
    (typeormMeta &&
      (typeormMeta.options.type === Date ||
        TypeormDateModes.has(typeormMeta.mode))) ||
    false
  );
}

function isLong(_: MetaType, typeormMeta?: ColumnMetadataArgs): boolean {
  return (
    (typeormMeta &&
      typeormMeta.options.type &&
      LongTypes.has(typeormMeta.options.type)) ||
    false
  );
}

function isDouble(_: MetaType, typeormMeta?: ColumnMetadataArgs): boolean {
  return (
    (typeormMeta &&
      typeormMeta.options.type &&
      DoubleTypes.has(typeormMeta.options.type)) ||
    false
  );
}

export function guessPropertyType(
  target: object,
  propertyKey: KeyType,
): PropType {
  const meta = getMetaType(target, propertyKey);
  const typeormMeta = getMetadataArgsStorage()
    .filterColumns(target.constructor)
    .find((m) => m.propertyName === propertyKey);
  const isType = isTypeFactory(meta, typeormMeta);

  if (isPrimaryKey(meta, typeormMeta) && (isType(String) || isType(Number))) {
    return "keyword";
  }

  if (isDate(meta, typeormMeta)) return "date";
  if (isLong(meta, typeormMeta)) return "long";
  if (isDouble(meta, typeormMeta)) return "double";
  if (isType(Number)) return "double";
  if (isType(String)) return "text";

  throw new errors.CouldNotGuessFieldType(
    target.constructor as Class<unknown>,
    propertyKey,
  );
}
