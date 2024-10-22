export function isObjEmpty<T extends object>(
  obj: T | undefined | null,
): boolean {
  return (
    !obj ||
    (Array.isArray(obj) && obj.length === 0) ||
    Boolean(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
  );
}

export function isObjNotEmpty<T extends object>(
  obj: T | undefined | null,
): obj is NonNullable<T> {
  return !isObjEmpty(obj);
}
