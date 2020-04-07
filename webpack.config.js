const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        library: 'CDPInstance',  // TODO CHANGEME
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
    }
};
