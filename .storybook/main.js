const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.(tsx|mdx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(t|j)s(x?)$/,
      include: path.resolve(__dirname, "../src"),
      exclude: /node_modules/,
      use: [
        { loader: "babel-loader" },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            // Provide the path to your tsconfig.json so that your stories can
            // display types from outside each individual story.
            tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
          },
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx");
    return config;
  },
};
