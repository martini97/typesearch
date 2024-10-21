import type { Class } from "src/common/class";

export class CouldNotGuessFieldType extends Error {
  constructor(objectClass: Class<unknown>, propertyKey: string | symbol) {
    super(
      `[typesearch] could not guess type for property ${objectClass.name}.${String(propertyKey)}`,
    );

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
