const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const BundleAnalyzer = require('webpack-bundle-analyzer')
function solve (urlpath) {
    return path.join(__dirname, urlpath)
}
module.exports = merge(baseConfig, {
    /**
     * production模式下默认启用这些插件
     * FlagDependencyUsagePlugin, // 应该是删除无用代码的，其他插件依赖
     * FlagIncludedChunksPlugin, // 应该是删除无用代码的，其他插件依赖
     * ModuleConcatenationPlugin,  // 作用域提升
     * NoEmitOnErrorsPlugin,  // 遇到错误代码不跳出
     * OccurrenceOrderPlugin,
     * SideEffectsFlagPlugin
     * UglifyJsPlugin.  // js代码压缩
     *
     * process.env.NODE_ENV 的值设为 production
     */
    mode: 'production',
    output: {
    /**
         * development下HotModuleReplacement下文件名无法使用hash
         * 所以将filename与chunkFilename配置从base中拆分到dev与prod中
         */
        filename: 'static/js/[name].[chunkhash:7].js',
        chunkFilename: 'static/js/[name].[chunkhash:7].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: solve('../dist/index.html'), // 文件写入路径
            template: solve('../src/index.html'), // 模板文件路径
            inject: true // 插入位置
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name]:[contenthash:7].css'
        }),
        /**
       * 正常来讲，引用node_modules不变的话，vender的hash应该是不变的，
       * 但是引用其他的模块，模块id变化会引起vender中模块id变化，引起hash变化，
       * 使用此插件对引入路径进行hash截取最后几位做模块标识可解决这个问题
       * 开发模式有另一个插件NamedModulesPlugin
      */
        new webpack.HashedModuleIdsPlugin(),
        new OptimizeCSSAssetsPlugin({}) // css压缩
        // new BundleAnalyzer.BundleAnalyzerPlugin() // bundle分析
    ],
    /**
     * 优化部分包括代码拆分
     * 且运行时(manifest)的代码拆分提取为独立的runtimeChunk配置
    */
    optimization: {
        splitChunks: {
            chunks: 'all', // 'all'表示全部块，‘initial’表示初始块，‘async’表示按需加载块
            cacheGroups: { // 缓存组
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors', // 拆分出来的名字，默认由块名和hash值自动生成
                    chunks: 'all'
                },
                commons: {
                    // async 设置提取异步代码中的公用代码
                    name: 'common',
                    /**
                     * minSize 默认30000
                     * 想要使代码拆分真的按我们的设置来，必须要减小minSize
                    */
                    minSize: 0,
                    // 至少为两个chunks的公用代码
                    minChunks: 2
                }
            }
        },
        /**
         * 对应原来的minChunks: Infinity
         * 提取webpack运行时代码
         * 直接设置为true或设置name
        */
        runtimeChunk: {
            name: 'manifest'
        }
    }
})
