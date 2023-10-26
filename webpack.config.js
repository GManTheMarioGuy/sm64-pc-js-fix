const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    devServer: {
        port: 80
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "template.css",
            chunkFilename: "[id].css"
        }),
        // new CircularDependencyPlugin({
        //   // `onStart` is called before the cycle detection starts
        //   onStart({ compilation }) {
        //     console.log('start detecting webpack modules cycles');
        //   },
        //   // `onDetected` is called for each module that is cyclical
        //   onDetected({ module: webpackModuleRecord, paths, compilation }) {
        //     // `paths` will be an Array of the relative module paths that make up the cycle
        //     // `module` will be the module record generated by webpack that caused the cycle
        //     compilation.errors.push(new Error(paths.join(' -> ')))
        //   },
        //   // `onEnd` is called before the cycle detection ends
        //   onEnd({ compilation }) {
        //     console.log('end detecting webpack modules cycles');
        //   },
        // })
    ],
    output: {
        publicPath: "/",
        filename: "[name]-[hash].js"
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({}),
            new OptimizeCSSAssetsWebpackPlugin({})
        ]
    },
}