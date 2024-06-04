import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    plugins: {
      pluginJs,
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
];
