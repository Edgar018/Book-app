const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'
    },
    mode: 'production',

    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
    },

    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    devMode ? 'style-loader': MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        })
    ],

    devtool: 'source-map'

}