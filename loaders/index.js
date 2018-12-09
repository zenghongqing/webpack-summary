/**
 * loader function
 * @param {String} content 文件内容
*/
// const loaderUtil = require('loader-utils')
function replace (content) {
    // console.log(content.replace(/(\/\/\s*@import) +(('|").+('|")).*/, 'require($2);'))
    // return content.replaxce(/(\/\/\s*@import) +(('|").+('|")).*/, 'require($2);')
    return content
}
module.exports = function (content) {
    // const options = loaderUtil.getOptions(this)
    // console.log('***options***', options)
    // return '{};' + content
    // 推荐this.callback方法导出数据
    // this.callback(null, '{111};' + content)
    return replace(content)
}
