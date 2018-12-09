class OptimizeModuleIdAndChunkIdPlugin {
    constructor (options) {
        this.options = options
    }
    apply (compiler) {
        const hashFunction = compiler.options.output.hashFunction
        const hashDigest = compiler.options.output.hashDigest
        const hashDigestLength = compiler.options.output.hashDigestLength
        compiler.hooks.compilation.tap('OptimizeModuleIdAndChunkIdPlugin', (compilation) => {
            compilation.hooks.beforeModuleIds.tap('OptimizeModuleIdAndChunkIdPlugin', (modules) => {
                modules.forEach(module => {
                    let moduleResourceArr = []
                    if (module.id === null && module.resource) {
                        const hash = require('crypto').createHash(hashFunction)
                        const nodeModulesPathIndex = module.resource.indexOf('node_modules')
                        if (nodeModulesPathIndex > -1) {
                            hash.update(module.resource.substr(nodeModulesPathIndex))
                        } else {
                            hash.update(module.resource.replace(compiler.context, ''))
                        }
                        if (moduleResourceArr.indexOf(module.resource) && !module.dependencies.length) {
                            module.id = hash.digest(hashDigest).substr(0, hashDigestLength - 1) + 1
                        } else {
                            module.id = hash.digest(hashDigest).substr(0, hashDigestLength)
                            moduleResourceArr.push(module.resource)
                        }
                    }
                    console.log(module.id, 'modules')
                })
            })
            compilation.hooks.beforeChunkIds.tap('OptimizeModuleIdAndChunkIdPlugin', (chunks) => {
                chunks.forEach(chunk => {
                    if (chunk.id === null) {
                        chunk.id = chunk.name
                    }
                    if (!chunk.ids) {
                        chunk.ids = [chunk.name]
                    }
                })
            })
        })
    }
}
module.exports = OptimizeModuleIdAndChunkIdPlugin
