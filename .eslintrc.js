module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "template-curly-spacing": "off",
    indent: "off",
    // Vue specific
    "vue/array-bracket-spacing": "error",
    "vue/arrow-spacing": "error",
    "vue/block-spacing": "error",
    "vue/brace-style": "error",
    "vue/camelcase": "error",
    "vue/comma-dangle": ["error", "never"],
    "vue/component-name-in-template-casing": "error",
    "vue/eqeqeq": "error",
    "vue/key-spacing": "error",
    "vue/no-v-html": "error",
    "vue/object-curly-spacing": ["error", "always"],
    "vue/space-infix-ops": "error",
    "vue/space-unary-ops": "error",
    "vue/v-on-function-call": "error",
    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
        closeBracket: 0,
      },
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "never",
      },
    ],
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea", "p", "span", "li"],
      },
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: {
          max: 2,
          allowFirstLine: false,
        },
      },
    ],
  },
};
