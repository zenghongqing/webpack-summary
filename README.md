## Webpack 学习记录
（1） Entry (必填)<br>
entry是模块的入口，可抽象成输入，webpack执行构建的第一步将从入口文件开始搜寻及递归解析出所有入口依赖的模块。
* context
webpack在寻找相对路径的文件时会以context为根目录，context默认执行启动webpack时所在的当前工作目录。注意：context必须是绝对路径的字符串
* 类型
string: './app/entry' <br>
array: ['./app/entry', './app/entry2'], 搭配output.library配置项使用，只有数组的最后一个入口文件的模块会被导出，即只会生成一个chunk<br>
object: { a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']}会生成多个chunk

(2) Loader (文件转换器) <br>
配置的module.rules数组配置了一组规则，告诉webpack遇到什么文件需要哪些Loader去加载和转换。需要注意的是：<br>
* use属性值需要一个由Loader名称组成的数组，执行顺序是从后向前
* 每一个Loader都可以通过URL querystring的方式传递参数，如css-loader?minimize 中的 minimize 告诉 css-loader 要开启 CSS 压缩。<br>

(3) Plugin (插件)<br>
Plugin用来扩展webpack功能，通过在构建流程里注入钩子实现。

### 优化方法
* 缩小文件搜索范围: 
```
module.exports = {
    resolve: {
        // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，
        // 减少耗时的递归解析操作
        alias: {
            'react': path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
        },
        // 尽可能的减少后缀尝试的可能性
        extensions: ['js']
    },
    module: {
        // 独完整的 `react.min.js` 文件就没有采用模块化，忽略对 `react.min.js` 文件的递归解析处理
        noParse: [/react\.min\.js$/],
        rules: [
        {
            // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
            test: /\.js$/,
            // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
            use: ['babel-loader?cacheDirectory'],
            // 只对项目根目录下的 src 目录中的文件采用 babel-loader
            include: path.resolve(__dirname, 'src'),
        },
        ]
    },
};
```
* 使用Dll Plugin以及多线程Happypack
* 压缩代码 parallelUglifyPlugin等
* 区分环境: <br>
```
new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
});
```
* CDN加速 <br>通过设置output以及mini-css-extract-plugin的publicPath <br>

* 使用Tree-Shaking <br>
用来剔除JavaScript用不上的死代码，它依赖静态的ES6模块化语法。<br>
* 提取公共代码 webpack4使用了splitChunks<br>
```
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
    }
}
```
* 按需加载
* 使用PrePack, 但是还不够完善<br>
通过babel把JS转成抽象语法树，以方便更细粒地分析源码<br>
PrePack实现了一个JavaScript解析器，用于执行源码，并把执行过程的结果返回到输出中
* 开启Scope Hoisting (作用域提升，使打包出来的代码文件更小，运行的更快)
```
// 开启 Scope Hoisting
new ModuleConcatenationPlugin()
```
### 怎么编写Plugin
webpack的内部机制是通过tapable来实现的，通过plugin方法订阅事件，根据不同的事件钩子类型执行对应的同步代码，基本的plugin写法如下：
```
class BasicPlugin {
    // 在构造函数中获取用户给该插件传入的配置
    constructor(options) {}

    // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
    apply(compiler) {
    compiler.plugin("compilation", function(compilation) {});
    }
}
```
#### webpack运行流程
<img src='https://user-gold-cdn.xitu.io/2018/1/30/161452a1ae6df8c9?imageView2/0/w/1280/h/960/ignore-error/1'>

需要了解以下几个概念<br>
* compiler: 代表了完整的webpack环境配置。该对象在启动时就创建好，由webpack组合所有的配置项（包括原始配置，加载器和插件）构建生成。
* compilation: 负责组织整个打包过程，包含每个构建环节、输出环节对应的方法以及存放着所有module、chunk、assets及用来生成打包文件的template信息，当运行webpack-dev-server时，每当检测到一个文件变化时，就会创建一个新的编译，从而生成一组新的编译资源。
* plugin: 本质上是被实例化的带有apply原型方法的对象，其apply方法在安装插件时被webpack编译器调用一次，apply提供一个compiler的引用，从而可以访问到webpack的环境。

#### Compiler事件钩子(运行模式)
1. entry-option: 读取配置的Entrys，为每一个Entry实例化一个对应的EntryPlugin，为后面的Entry的递归解析工作做准备。
2. (before-)run: 开始执行，启动构建。
3. (before/after-)compiler: 编译源码，创建对应的Compilation对象，它包含一次构建过程所有的数据，也就是说一次构建对应一个Compilation实例。
4. make: 构建
5. (after-)emit: 输出结果
6. done: 结束
监测模式对应下面三个钩子: <br>
1. watch-run
2. invalid
3. watch-close
#### Compilation事件钩子
compiler的几个事件钩子贯穿了整个webpack构建过程，但是具体到实际版本构建等操作，却是由compilation来具体执行。终点负责后续的添加模块、构建模块、打包并输出资源的具体操作(对应compiler的make过程)
1. addEntry: 该方法实际上是调用了_addModuleChain/私有方法，该方法根据入口文件这第一个依赖的类型创建一个ModuleFactory，然后再使用moduleFactory给入口文件创建一个Module实例，这个module实例用来管理后续这个入口构建的相关数据信息。
2. addModule添加模块: compilation会通过identifier判断是否已经有当前module，如果有则跳过。
3. buildModule构建模块,主要步骤：
* 读取module/模块，调用Loader加载器进行处理，并输出对应源码: (1) 遇到依赖时，递归地处理依赖的module (2) 把处理完的module依赖添加至当前模块。
* 调用acorn解析加载器输出的源文件，并生成抽象语法树AST
* 遍历AST树，构建该模块以及所依赖的模块
* 整合模块和所有对应的依赖，输出整体的module

#### seal 打包输出模块
1. 构建完模块后，会在回调函数里调用compilation的seal方法。Compilation的seal事件里，会根据webpack里配置的每个Entry入口开始打包，每一个Entry对应地打包出一个chunk，逐次对每个module和chunk进行整理，生成编译的源码chunk，合并、拆分、生成hash，最终输出Assets资源。
2. 对每一个Entry入口进行构建
3. createChunkAssets/生成Assets资源: 在整个createChunkAssets过程里，有个有意思的地方需要注意，就是mainTemplate、chunkTemplate和moduleTemplate。template是用来处理上面输出的chunk，打包成最终的Assets资源。但是mainTemplate是用来处理入口模块，chunkTemplate是处理非入口模块，即引用的依赖模块。
4. 通过这两个template的render处理输出source源码，都会汇总到moduleTemplate进行render处理输出module。接着module调用source抽象方法输出assets，最终由compiler统一调用emitAssets，输出至指定文件路径。
<img src='https://user-gold-cdn.xitu.io/2018/1/30/16145295cfd2623e?imageView2/0/w/1280/h/960/ignore-error/1'>