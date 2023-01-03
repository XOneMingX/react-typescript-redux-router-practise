// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: [
    // "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    // "plugin:react-hooks/recommended",
    // "airbnb",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "no-mixed-spaces-and-tabs": 0,
    indent: [2, 2, { SwitchCase: 1 }],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "block-scoped-var": "error",
    complexity: ["warn", 5],
    "default-case": "error",
    "dot-location": ["error", "property"],
    eqeqeq: ["error", "always"],
    "no-alert": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-magic-numbers": ["warn", { ignoreDefaultValues: true }],
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-new": "error",
    "no-redeclare": "error",
    "no-return-assign": ["error", "always"],
    "no-self-compare": "error",
    "no-useless-return": "error",
    "no-undef-init": "error",
    "global-require": "error",
    // "array-bracket-newline": ["error", { minItems: 4 }],
    "brace-style": "error",
    "block-spacing": "error",
    camelcase: ["error", { properties: "always" }],
    "comma-style": ["error", "last"],
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "implicit-arrow-linebreak": ["error", "beside"],
    "jsx-quotes": ["error", "prefer-double"],
    "max-params": ["error", 3],
    "max-nested-callbacks": ["error", 3],
    "max-len": [
      1,
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    "max-statements": ["error", 35],
    "max-statements-per-line": ["error", { max: 1 }],
    // "multiline-ternary": ["error", "never"],
    "new-cap": ["error", { newIsCap: true }],
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
    "no-inline-comments": "error",
    "no-lonely-if": "error",
    "no-mixed-operators": ["error", { allowSamePrecedence: true }],
    "no-multi-assign": "error",
    "no-whitespace-before-property": "error",
    "object-curly-newline": ["warn", { consistent: true }],
    "one-var-declaration-per-line": ["error", "always"],
    "no-var": "error",
    "no-useless-computed-key": "error",
    "react/prop-types": ["off"],
    // "lines-between-class-members": ["error", "always"],
    // "no-unused-vars": "error",

  },
}
