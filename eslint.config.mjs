import { defineConfig } from "eslint/config";
import eslint from "eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: ["eslint.config.mjs"],
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "commonjs",
      parserOptions: {
        project: ["./tsconfig.base.json", "./packages/*/tsconfig.json"],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-declaration-merging": "off",
      // "@typescript-eslint/no-floating-promises": "off",
      // "@typescript-eslint/no-unsafe-argument": "off",
      // "@typescript-eslint/no-unsafe-call": "off",
      // "@typescript-eslint/no-unsafe-return": "off",
      // "@typescript-eslint/no-misused-promises": "off",
      // "@typescript-eslint/unbound-method": "off",
    },
  },
);
