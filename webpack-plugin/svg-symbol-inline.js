const fs = require('fs')
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin')
class SvgSymbolInline {
    constructor (options = {}) {
        this.options = {
            path: 'svg/symbol/svg/sprite.symbol.svg'
        }
    }
    apply (compiler) {
        compiler.hooks.compilation.tap('SvgSymbolInline', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('SvgSymbolInline', (data, cb) => {
                // 生成的index.html 中的body部分包含了SVG文件的内容，但是 SVG图片不能被浏览器缓存
                this.insertSvg(data.html).then(html => {
                    data.html = html
                    cb(null, data)
                })
            })
        })
    }
    insertSvg (html) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.options.path, 'utf8', (err, data) => {
                if (err) return reject(err)
                data = data.replace(/<\?xml.*?>/, '').replace(/(<svg.*?)(?=>)/, '$1 style="display: none;"')
                html = html.replace(/(<body\s*>)/i, `$1${data}`)
                resolve(html)
            })
        })
    }
}

module.exports = SvgSymbolInline
