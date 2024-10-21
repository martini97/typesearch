import type { MappingProperty } from "@elastic/elasticsearch/lib/api/types";

import type { Class } from "src/common/class";
import * as errors from "src/exceptions";
import { getMetaType } from "src/common/get-meta-type";

type KeyType = string | symbol;
type PropType = MappingProperty["type"];

export function guessPropertyType(
  target: object,
  propertyKey: KeyType,
): PropType {
  const metaType = getMetaType(target, propertyKey);
  if (metaType === String) return "text";
  if (metaType === Date) return "date";

  throw new errors.CouldNotGuessFieldType(
    target.constructor as Class<unknown>,
    propertyKey,
  );
}
