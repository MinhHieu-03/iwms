import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      
      // Code Quality Rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-var": "error",
      
      // TypeScript Rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      
      // Import Rules (you'll need eslint-plugin-import)
      // "import/order": ["error", { "groups": ["builtin", "external", "internal"] }],
      
      // React Rules
      "react-hooks/exhaustive-deps": "warn",
      
      // Custom naming conventions
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "prefix": ["I"]
        },
        {
          "selector": "typeAlias",
          "format": ["PascalCase"]
        },
        {
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE", "PascalCase"]
        }
      ],
    },
  }
);
