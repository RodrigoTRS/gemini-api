import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
    {
        rules: {
            semi: ["error", "always"], // Enforce semicolons
            quotes: ["error", "double"], // Enforce double quotes
            indent: ["error", 4], // Enforce 2-space tab spacing
            "no-unused-vars": ["error"], // Disallow unused variables
            "no-undef": ["error"], // Disallow use of undeclared variables
        },
        ignores: ["db/", "node_modules/", "dist/"], // Exclude specific directories

    },
    {
        files: [
            "**/*.{js,mjs,cjs,ts}"
        ]
    },
    {
        languageOptions:
      {
          globals: {
              ...globals.browser,
              ...globals.node,
              ...globals.mocha,
              ...globals.jest,
          }
      }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];