'use strict'
process.env.NODE_ENV = 'development'
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = merge(baseWebpackConfig, {
    /**
     * development模式下启用以下插件
     * NamedChunksPlugin // 使用entry名做标识
     * namedModulesPlugin // 使用模块的相对路径非自增id做标识
     * 以上两个模块均为解决hash固话的问题
    */
    mode: 'development',
    output: {
        /**
         * HotModuleReplacement下文件名无法使用hash，
         * 所以将filename与chunkFilename配置从base中拆分到dev与prod中
         */
        filename: 'static/[name].js',
        chunkFilename: 'static/[id].js'
    },
    devServer: {
        clientLogLevel: 'warning',
        inline: true,
        hot: true, // 启动热更新
        // 在页面上全屏输出报错信息
        overlay: {
            warnings: true,
            errors: true
        },
        // 显示进度
        progress: true,
        // dev-server 服务路径
        contentBase: false,
        compress: true,
        host: 'localhost',
        port: '8080',
        open: true,
        quiet: true,
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin(),
        /**
         * 对应production下hashedModuleIdsPlugin插件
         * 使用路径做模式标识
         * 因为development模式下默认使用，不再开启
        */
        //    new webpack.NamedModulesPlugin()
        new HtmlWebpackPlugin({
            filename: 'index.html', // 文件写入路径，前面的路径与 devServer 中 contentBase 对应
            template: path.resolve(__dirname, '../src/index.html'),
            inject: true
        }),
        new BundleAnalyzer({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            logLevel: 'info'
        })
    ]
})
