import { test, expect } from "vitest";

import { isObjEmpty, isObjNotEmpty } from "./is-object-empty";

test.each([
  [{}, true],
  [null, true],
  [undefined, true],
  [[], true],
  [{ foo: 1 }, false],
  [[0], false],
])("isObjEmpty (%#)", (input, expected) => {
  expect(isObjEmpty(input)).toBe(expected);
  expect(isObjNotEmpty(input)).toBe(!expected);
});
