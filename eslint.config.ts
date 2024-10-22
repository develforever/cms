
import type { Linter } from "eslint";
import globals from "globals";

import reacteslint from "eslint-plugin-react";

const files = ["react/**/*.{js,mjs,cjs,ts,jsx,tsx}"];
const languageOptions = {
  globals: {
    ...globals.browser,
    ...globals.node,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};

const jsxRuntime = reacteslint.configs.flat["jsx-runtime"];

const conf = [
  {
    files,
    languageOptions,
  },
] satisfies Linter.Config[];

console.debug(conf);

export default conf;