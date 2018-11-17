import Vue from 'vue'
import ToastConfig from './Toast.vue'
let instance = null
let timer = null
// https://cn.vuejs.org/v2/api/#Vue-extend
const ToastConstructor = Vue.extend(ToastConfig)
ToastConstructor.prototype.close = function () {
    this.visible = false
    this.$el.addEventListener('transitionend', this.destroyeInstance.bind(this))
}

ToastConstructor.prototype.destroyeInstance = function () {
    instance = null
    this.$destroy(true)
    this.$el.removeEventListener('transitionend', this.destroyeInstance)
    this.$el.parentNode.removeChild(this.$el)
}

function init (msg = '默认信息') {
    if (instance) {
        instance.visible = true
        instance.msg = msg
        if (timer) {
            clearInterval(timer)
        }
        instance.$el.removeEventListener('transitionend', instance.destroyeInstance)
    } else {
    // https://cn.vuejs.org/v2/api/#vm-mount
        instance = new ToastConstructor({
            el: document.createElement('div'),
            propsData: {
                msg: msg,
                visible: false
            }
        })
        document.body.appendChild(instance.$el)
    }
    Vue.nextTick(() => {
        instance.visible = true
        timer = setTimeout(() => {
            instance.close()
        }, 2000)
    })
}

export default init
