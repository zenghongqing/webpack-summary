<template>
  <transition name="toast-bounce">
    <div class="toast" v-show="visible">
      <p class="toast-msg">{{ msg }}</p>
    </div>
  </transition>
</template>
<script>
export default {
    name: 'Toast',
    props: {
        msg: {
            required: true,
            type: String
        },
        visible: {
            required: true,
            type: Boolean
        }
    }
}
</script>
<style lang="scss" scoped>
  // 添加动画
  .toast-bounce-enter, .toast-bounce-leave {
    opacity: 0;
  }
  .toast {
    position: fixed;
    max-width: 80%;
    left: 50%;
    top: 50%;
    padding: 20px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: all .3s ease;
    transform: translate(-50%, -50%);
    .toast-msg {
      text-align: center;
    }
  }
</style>
