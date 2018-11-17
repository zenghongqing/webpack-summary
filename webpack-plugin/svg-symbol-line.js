const fs = require('fs')
const crypto = require('crypto')
// const path = require('path')
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin')
let symbolFileName = ''

class SvgSymbolLine {
    constructor (options = {}) {
        let filePath = 'svg/symbol/svg/sprite.symbol.svg'
        if (options.path) {
            filePath = options.path
        }
        this.options = {
            path: filePath
        }
        this.symbolFileName = 'static/icon-symbol.svg'
    }
    apply (compiler) {
        // 这里如果是tap监听，dist文件下不会生成svg文件
        compiler.hooks.emit.tapAsync('SvgSymbolLine', (compilation, cb) => {
            this.getContent().then(content => {
                // const hash = process.env.NODE_ENV === 'production' ? this.getHash(content) : ''
                // symbolFileName = `static/icon-symbol.svg${hash ? `?h=${hash}` : ''}`
                compilation.assets[this.symbolFileName] = {
                    source: () => content,
                    size: () => Buffer.byteLength(content, 'utf8')
                }
                cb()
                console.log(Object.keys(compilation.assets), compilation.assets[symbolFileName].size(), '新增')
            }).catch(err => {
                console.log('错误' + err)
            })
        })
        compiler.hooks.done.tap('SvgSymbolLine', (stats) => {
            // console.log(stats.compilation.assets, 'after')
        })
        compiler.hooks.compilation.tap('SvgSymbolInline', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('SvgSymbolInline', (data, cb) => {
                data.headTags.push({
                    tagName: 'link',
                    voidtag: false,
                    attributes: {
                        href: '/' + this.symbolFileName,
                        rel: 'prefetch',
                        as: 'image',
                        type: 'image/svg+xml',
                        crossorigin: 'anonymous'
                    }
                })
                cb(null, data)
            })
        })
    }
    getContent () {
        return new Promise((resolve, reject) => {
            fs.readFile(this.options.path, 'utf8', (err, data) => {
                if (err) return reject(err)
                data = data.replace(/<\?xml.*?>/, '')
                resolve(data)
            })
        })
    }
    getHash (content) {
        return crypto.createHash('md5').update(content).digest('hex').substr(0, 20)
    }
}
module.exports = SvgSymbolLine
