const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        library: 'CDPFrontend',  // TODO CHANGEME
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(t|j)s(x?)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                    },
                ],
            },
            {
                test: /\.(woff(2)?)$/i,
                use: [
                    "file-loader"
                ],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    externals: {
        "@emotion/styled": "@emotion/styled",
        moment: "moment",
        react: "react",
        "semantic-ui-react": "semantic-ui-react",
    },
    plugins: [new MiniCssExtractPlugin()],
};
