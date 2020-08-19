const path = require('path');
const webpack = require('webpack');
const webpackBase = require('./webpack.base.js');
const webpackMerge = require('webpack-merge');
// 清理 dist 文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// js压缩、优化插件
const TerserPlugin = require('terser-webpack-plugin');
// 抽取css extract-text-webpack-plugin不再支持webpack4，官方出了mini-css-extract-plugin来处理css的抽取
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = webpackMerge(webpackBase, {
    mode: 'production',
    output: {
        publicPath: './',
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[id].js'
    },
    optimization: {
        splitChunks: {
            maxInitialRequests: 5,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: -10,
                    enforce: true,
                },
                common: {
                    test: /[\\/]src[\\/](common|components)[\\/]/,
                    name: 'common',
                    chunks: 'all',
                    priority: 20,
                },
            }
        },
        minimizer: [
            new TerserPlugin({ // 压缩js
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_debugger: false,
                        drop_console: true
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                },
            }),
            new OptimizeCSSAssetsPlugin({ // 压缩css
                cssProcessorOptions: {
                    safe: true
                }
            })
        ]
    },
    plugins: [
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
            verbose: true, //开启在控制台输出信息
            dry: false,
            dangerouslyAllowCleanPatternsOutsideProject: true, // 输出文件前清理干净
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify('prod'),
            },
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
    ],
});
