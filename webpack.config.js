
const path = require("path");
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        root: "./react/root.tsx"
    },
    stats: {
        logging: "verbose",
        moduleTrace: true,
        errorDetails: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV || 'development')
        }),
    ],
    mode: process.env.NODE_ENV || 'development',
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