import type { Class } from "src/common/class";
import type { SearchFieldOpts } from "src/common/search-field-options";
import { guessPropertyType } from "src/common/guess-property-type";
import { getMetadataStorage } from "src/globals";

export function SearchField(options?: SearchFieldOpts): PropertyDecorator {
  return function (target, propertyKey) {
    const name = options?.name ?? String(propertyKey);
    const mapping = { ...(options?.mapping ?? {}) };
    mapping.type = mapping.type ?? guessPropertyType(target, propertyKey);

    getMetadataStorage().addSearchField(
      target.constructor as Class<unknown>,
      target,
      propertyKey,
      { ...options, mapping, name },
    );
  };
}
