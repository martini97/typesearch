import type { Class } from "src/common/class";
import type { SearchEntityOpts } from "src/common/search-entity-options";
import { getMetadataStorage } from "src/globals";

export function SearchEntity(options?: SearchEntityOpts): ClassDecorator {
  return function (target) {
    getMetadataStorage().addSearchEntity(target as unknown as Class<unknown>, {
      name: options?.name ?? target.name,
      settings: options?.settings ?? {},
    });
  };
}
