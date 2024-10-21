import type { Class } from "src/common/class";
import { getMetadataStorage } from "src/globals";

type SearchEntityOpts = {
  name?: string;
};

export function SearchEntity(options?: SearchEntityOpts): ClassDecorator {
  return function (target) {
    const name = options?.name ?? target.name;
    const targetCls = target as unknown as Class<unknown>;
    getMetadataStorage().addSearchEntity({ name, target: targetCls });
  };
}
