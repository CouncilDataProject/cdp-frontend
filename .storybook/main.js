const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(tsx|mdx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
    "@storybook/addon-essentials",
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
