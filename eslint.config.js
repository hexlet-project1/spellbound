/* eslint-disable */
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
// 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended});

export default [
  {languageOptions: {
     globals: {...globals.browser, ...globals.node}, 
     parser: babelParser}},
  ...compat.extends("airbnb"),
  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-use-before-define": "off",
      "no-param-reassign": "off",
      "no-console": "off",
      "class-methods-use-this": "off",
    }
  },
  {
    "settings": {
      "react": {
        "version": "0"
      }
    }
  }
];
/* eslint-disable */