import Vue from 'vue'
import ToastConfig from './Toast.vue'
// https://cn.vuejs.org/v2/api/#Vue-extend
const ToastConstructor = Vue.extend(ToastConfig)
ToastConstructor.prototype.close = function () {
    this.visible = false
    this.$el.addEventListener('transitionend', this.destroyeInstance.bind(this))
}

ToastConstructor.prototype.destroyeInstance = function () {
    this.$destroy(true)
    this.$el.removeEventListener('transitionend', this.destroyeInstance)
    this.$el.parentNode.removeChild(this.$el)
}

function init (msg = '默认信息') {
    // https://cn.vuejs.org/v2/api/#vm-mount
    const instance = new ToastConstructor({
        el: document.createElement('div'),
        propsData: {
            msg: msg,
            visible: false
        }
    })
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
        instance.visible = true
        setTimeout(() => {
            instance.close()
        }, 3000)
    })
}

export default init
