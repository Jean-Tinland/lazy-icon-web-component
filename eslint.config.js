import { rules, configs as wcConfigs } from "eslint-plugin-wc";

const config = [
  {
    files: ["**/*.tsx", "**/*.ts", "**/*.js"],
    ...wcConfigs["flat/recommended"],
    rules: {
      "wc/no-closed-shadow-root": "error",
      "wc/no-invalid-element-name": "error",
      "wc/attach-shadow-constructor": "error",
      "wc/guard-super-call": "error",
      "wc/no-customized-built-in-elements": "error",
      "wc/no-invalid-extends": "error",
      "wc/no-typos": "error",
      "wc/require-listener-teardown": "error",
      "wc/file-name-matches-element": "error",
      "wc/no-self-class": "error",
      "wc/define-tag-after-class-definition": "error",
      "wc/guard-define-call": "error",
      "wc/max-elements-per-file": "error",
      "wc/no-method-prefixed-with-on": "error",
      "wc/tag-name-matches-class": "error",
      "wc/no-child-traversal-in-attributechangedcallback": "error",
      "wc/no-exports-with-element": "error",
      "wc/no-child-traversal-in-connectedcallback": "error",
      "wc/no-constructor": "error",
      "wc/no-constructor-attributes": "error",
      "wc/no-constructor-params": "error",
      "wc/expose-class-on-global": "error",
    },
  },
];

export default config;
