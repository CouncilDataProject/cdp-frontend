const path = require("path");

module.exports = {
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json"
  ).parse,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },
  title: "Front-end tooling library for React components for CDP instance deployments",
  styleguideDir: "dist-docs",
  moduleAliases: {
    "cdp-instance": path.resolve(__dirname, "src")
  }
};
