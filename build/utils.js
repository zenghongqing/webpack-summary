const MiniCssExtractPlugin = require('mini-css-extract-plugin')
exports.cssLoaders = (options) => {
    const postLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    const generateLoaders = (type, loaderOptions) => {
        const loaders = options.usePostCSS ? [cssLoader, postLoader] : [cssLoader]
        loaderOptions = loaderOptions || {}
        if (type) {
            loaders.push({
                loader: `${type}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.extract) {
            return [{
                loader: MiniCssExtractPlugin.loader,
                /**
                 * 引用其他如img/a.png会寻址错误
                 * 这种情况下所以单独需要配置../../，复写其中资源的路径
                */
                options: {
                    publicPath: '../../'
                }
            }].concat(loaders)
        } else {
            // vue-style-loader: 把内容提取并加载到文档的 <head> 内的 <style> 标签内
            return ['vue-style-loader'].concat(loaders)
        }
    }
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        scss: generateLoaders('sass'),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        styl: generateLoaders('stylus'),
        stylus: generateLoaders('stylus')
    }
}
/**
 * 无组件关联的单独的样式文件的处理
 * 由于vue-loader对非组件相关的样式文件无能为力, 故需要单独配置
*/
exports.styleLoaders = (options) => {
    const rules = []
    const loaders = exports.cssLoaders(options)
    for (let type in loaders) {
        rules.push({
            test: new RegExp(`\\.${type}$`),
            use: loaders[type]
        })
    }
    return rules
}
