import Vue from 'vue'
import ConfirmConfig from './Confirm.vue'
let currentMsg = null
let instance = null

const ConfirmConstructor = Vue.extend(ConfirmConfig)

function confirm (option = {}) {
    instance = new ConfirmConstructor({
        el: document.createElement('div')
    })
    if (typeof option === 'string') {
        instance.message = option
    } else {
        instance.title = option.title || '提示'
        instance.message = option.message || '提示信息'
        instance.showConfirmButton = !!option.showConfirmButton
        instance.showCancelBtn = !!option.showCancelBtn
        instance.confirmBtnText = option.confirmBtnText || '确定'
        instance.cancelBtnText = option.cancelBtnText || '取消'
    }
    instance.$watch('display', function (val) {
    // 再次关闭时移除组件
        if (!val) {
            instance.$destroy(true)
            instance.$el.parentNode.removeChild(instance.$el)
            instance = null
            currentMsg = null
        }
    })
    instance.callBack = defaultCallBack
    document.body.appendChild(instance.$el)
    instance.display = true
    Vue.nextTick(() => {
        instance.visible = true
    })
    return new Promise((resolve, reject) => {
        currentMsg = {
            resolve,
            reject
        }
    })
}

function defaultCallBack (action) {
    console.log(`action is ${action}`)
    instance.visible = false
    if (action === 'confirm') {
        currentMsg.resolve('confirm')
    } else {
        currentMsg.reject('cancel')
    }
}

export default confirm
