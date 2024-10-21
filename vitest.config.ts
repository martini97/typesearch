/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { swc } from "rollup-plugin-swc3";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
  },
  esbuild: false,
  plugins: [
    swc({
      minify: false,
      sourceMaps: true,
      jsc: {
        target: "esnext",
        transform: { decoratorMetadata: true },
        parser: { syntax: "typescript", dynamicImport: true, decorators: true },
      },
    }),
  ],
});
