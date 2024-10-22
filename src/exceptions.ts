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

export class CouldNotFindMetadata extends Error {
  constructor(entityCls: Class<unknown>) {
    super(`[typesearch] could not find metadata for ${entityCls.name}}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class CouldNotFindEntityName extends Error {
  constructor(entityCls: Class<unknown>) {
    super(`[typesearch] could not find entity name for ${entityCls.name}}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class CouldNotFindFieldName extends Error {
  constructor(entityCls: Class<unknown>, propertyKey: string | symbol) {
    super(
      `[typesearch] could not find field name for ${entityCls.name}.${String(propertyKey)}`,
    );
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class CouldNotFindFieldMapping extends Error {
  constructor(entityCls: Class<unknown>, propertyKey: string | symbol) {
    super(
      `[typesearch] could not find field mapping for ${entityCls.name}.${String(propertyKey)}`,
    );
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
