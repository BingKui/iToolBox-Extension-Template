const path = require('path');
// html 插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// vue loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 文件 copy 插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 抽取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 优化输入信息插件
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');

const isProd = process.env.ENV === 'prod';

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/index.js'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/, // 处理vue模块
                use: [{
                    loader: 'vue-loader',
                    options: {
                        extractCSS: isProd,
                        loaders: {
                            less: 'vue-style-loader!css-loader!postcss-loader!less-loader',
                        },
                    },
                }],
            },
            {
                test: /\.js$/, //处理es6语法
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        },
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, '../src/styles/var.less'),
                        }
                    },
                ]
            },
            {
                test: /\.(js|vue)$/,
                enforce: 'pre', // 强制先进行 ESLint 检查
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 启用自动修复
                    fix: true,
                    // 启用警告信息
                    emitWarning: true,
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        publicPath: '../',
                        name: '[folder]/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[folder]/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        publicPath: '../',
                        name: '[folder]/[name].[ext]'
                    }
                }
            },
        ],
    },
    resolve: { // 设置模块如何被解析
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@assets': path.resolve(__dirname, '../src/assets'),
            '@biz': path.resolve(__dirname, '../src/biz'),
            '@common': path.resolve(__dirname, '../src/common'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@constants': path.resolve(__dirname, '../src/constants'),
            '@mixins': path.resolve(__dirname, '../src/mixins'),
            '@router': path.resolve(__dirname, '../src/router'),
            '@mock': path.resolve(__dirname, '../src/mock'),
            '@store': path.resolve(__dirname, '../src/store'),
            '@styles': path.resolve(__dirname, '../src/styles'),
            '@views': path.resolve(__dirname, '../src/views'),
        },
        extensions: ['*', '.less', '.css', '.js', '.vue']
    },
    plugins: [
        new VueLoaderPlugin(),
        new FirendlyErrorePlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist'),
            ignore: ['*.html']
        }, ]),
        new HTMLWebpackPlugin({
            title: 'itools-plugin', // 生成的html页面的标题
            filename: 'index.html', // 生成到dist目录下的html文件名称，支持多级目录（eg: `${item.page}/index.html`）
            template: path.resolve(__dirname, '../public/index.html'), // 模板文件，不同入口可以根据需要设置不同模板
            chunks: ['index', 'vendor', 'common'], // html文件中需要要引入的js模块，这里的 vendor 是webpack默认配置下抽离的公共模块的名称
            dateTime: (new Date()).getTime(),
        }), // 利用 HTMLWebpackPlugin 插件合成最终页面
    ]
};
