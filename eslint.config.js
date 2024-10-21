import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], ignores: ["dist/"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  {
    rules: {
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
    },
  },
];
