import "reflect-metadata";

type MetaType = ReturnType<typeof Reflect.getMetadata>;

export function getMetaType(
  target: object,
  propertyKey: string | symbol,
): MetaType {
  return Reflect.getMetadata("design:type", target, propertyKey);
}
