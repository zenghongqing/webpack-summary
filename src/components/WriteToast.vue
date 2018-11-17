<template>
  <div>
    <toast :visible="visible" msg="测试"></toast>
    <p>
      <button @click="handleToastShow">显示 toast 组件</button>
    </p>
    <p>
      <button @click="createToast">直接创建一个 toast 组件</button>
    </p>
    <p>
      <button @click="createToast2">多次点击只会有一个 toast 组件</button>
    </p>
  </div>
</template>

<script>
import Toast from './common/Toast/Toast.vue'
import toast from './common/Toast'
import toast2 from './common/Toast/index-v2'
export default {
    name: 'WriteToast',
    data () {
        return {
            timer: null,
            visible: false
        }
    },
    methods: {
        handleToastShow () {
            if (this.timer) {
                console.log('清除定时器')
                clearInterval(this.timer)
            }
            this.visible = true
            this.timer = setTimeout(() => {
                this.visible = false
                this.timer = null
            }, 3000)
        },
        createToast () {
            console.log('通过函数创建 toast 组件')
            toast()
        },
        createToast2 () {
            toast2()
        }
    },
    components: {
        Toast
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .example {
    line-height: 26px;
    background-color: #e1e1e1;
    span {
      display: inline-block;
      background-color: #cccccc;
    }
  }
</style>
