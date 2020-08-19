const path = require('path');
const webpack = require('webpack');
const webpackBase = require('./webpack.base.js');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(webpackBase, {
    mode: 'development',
    output: {
        publicPath: '/',
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[id].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        // historyApiFallback: {
        //     rewrites: {},
        // },
        disableHostCheck: true,
        overlay: {
            errors: true,
            warnings: true,
        },
        open: false, // 服务启动后 打开浏览器
        proxy: { // 本地接口代理转发
            // '/api/sh/v1': {
            //     target: 'http://10.0.244.37:8080',//目标接口域名
            //     changeOrigin: true,//是否跨域
            // },
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify('dev'),
            },
        }),
    ],
});
