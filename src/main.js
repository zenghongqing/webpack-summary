import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import 'reset.css'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

// 注册sw.js
if (navigator.serviceWorker !== null) {
    navigator.serviceWorker.register('sw.js')
        .then((registeration) => {
            console.log('支持sw:', registeration.scope)
        })
}
