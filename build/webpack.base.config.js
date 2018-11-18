const path = require('path')
const utils = require('./utils')
const VueLoaderConfig = require('./vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        'app': './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        // Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                // 大部分配置抽取到.eslintrc.js文件中去
                options: {
                    formmater: require('friendly-errors-webpack-plugin'),
                    emitWarning: true
                }
            },
            {// 包含在.vue文件内的css预处理器配置
                test: /\.vue$/,
                loader: 'vue-loader',
                options: VueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/] // 否则加上transform-runtime的babel配置会报错
            },
            // 单独配置的css预处理器
            ...utils.styleLoaders({
                sourceMap: true,
                extract: process.env.NODE_ENV === 'production',
                usePostCSS: true
            }),
            {
                test: /\.(png|hpg|jpeg|svg|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|mp3|wav|webm|ogg|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2|woff|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    }
}
