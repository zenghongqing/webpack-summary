const path = require('path')
const urlResolve = require('url').resolve
const fs = require('fs')
const UglifyJS = require('uglify-js')
class SwWebpackPlugin {
    constructor (options) {
        this.options = options
    }
    getPublicPath (compilation) {
        // 这里根据实际开发环境的静态资源路径决定
        return path.join(__dirname, compilation.options.output.publicPath)
        // console.log(compilation.options.output, '111')
    }
    isShouldCache (fileUrl) {
        const { include, exclude } = this.options
        if (include instanceof RegExp && !include.test(fileUrl)) {
            return false
        }
        if (exclude instanceof RegExp && exclude.test(fileUrl)) {
            return false
        }
        return true
    }
    getSwContent () {
        const { sw } = this.options
        if (fs.existsSync(sw)) {
            return fs.readFileSync(sw)
        } else {
            if (typeof sw === 'string') {
                return sw
            } else {
                return fs.readFileSync(path.resolve(__dirname, 'sw.js'))
            }
        }
    }
    addFileToWebpackOutput (compilation, filename, fileContent) {
        compilation.assets[filename] = {
            source: () => fileContent,
            size: () => Buffer.byteLength(fileContent, 'utf8')
        }
    }
    apply (compiler) {
        compiler.hooks.emit.tap('SwWebpackPlugin', (compilation) => {
            const publicPath = this.getPublicPath(compilation)
            const shouldCacheFileUrlList = []
            Object.keys(compilation.assets).map(link => {
                // publicPath路径根据实际静态资源路径确定
                const fileUrl = urlResolve(publicPath, link)
                if (this.isShouldCache(fileUrl)) {
                    shouldCacheFileUrlList.push(fileUrl)
                }
            })
            let injectData = {
                assets: shouldCacheFileUrlList,
                hash: compilation.hash
            }
            var fileContent = `const _sw = ${JSON.stringify(injectData)}
            ${this.getSwContent()}`
            if (process.env.NODE_ENV === 'production') {
                const uglifyJSRes = UglifyJS.minify(fileContent)
                if (uglifyJSRes.error) {
                    console.log(uglifyJSRes.error)
                } else {
                    fileContent = uglifyJSRes.code
                }
            }
            this.addFileToWebpackOutput(compilation, 'sw.js', fileContent)
        })
    }
}

module.exports = SwWebpackPlugin
