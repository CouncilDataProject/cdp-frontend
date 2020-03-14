module.exports = {
  "extends": [
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "prettier/@typescript-eslint",
  ],
  "env": {
      "mocha": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "project": "tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "root": true,
  "rules": {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/camelcase": "off",
  }
};