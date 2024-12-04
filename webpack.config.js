
const path = require("path");
const webpack = require('webpack');
var IndexWebpackPlugin = require('./react/docs/IndexWebpackPlugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        root: "./react/root.tsx",
        docs: "./react/docs.tsx"
    },
    stats: {
        logging: "verbose",
        moduleTrace: true,
        errorDetails: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new IndexWebpackPlugin()
    ],
    mode: process.env.NODE_ENV || 'development',
    watchOptions: {
        ignored: [
            '**/node_modules',
            '**/DocblockList.tsx'
        ],
        aggregateTimeout: 300,
        poll: 1000,
    },
    experiments: {
        outputModule: true,
        css: true,
    },
    output: {
        libraryTarget: 'module',
        filename: '[name].js',
        path: path.resolve(__dirname, "public/js")
    },
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'react/'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /.(js|jsx|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    }
                },
            },
            {
                type: "javascript/auto",
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};