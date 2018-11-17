<template>
  <div class="confirm-wrapper" v-show="display">
    <div class="modal" @click="handleAction('confirm')" @touchmove.prevent></div>
    <transition name="confirm-bounce" @after-leave="afterLeave">
      <div class="confirm-box" v-show="visible">
        <p class="confirm-header" v-if="title">{{ title }}</p>
        <p class="confirm-body" v-if="message">{{ message }}</p>
        <div class="confirm-footer">
          <button class="cancel-btn" @click="handleAction('cancel')" v-if="showCancelBtn">
            {{ cancelBtnText}}
          </button>
          <button class="confirm-btn" @click="handleAction('confirm')" v-if="showConfirmButton">
            {{ confirmBtnText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
    name: 'confirm',
    data () {
        return {
            display: false,
            visible: false
        }
    },
    methods: {
        afterLeave () {
            this.display = false
        },
        handleAction (action) {
            if (action === 'cancel' || action === 'confirm') {
                this.callBack && this.callBack(action)
            }
        }
    },
    props: {
        title: {
            type: String,
            default: '提示'
        },
        message: String,
        showConfirmButton: {
            type: Boolean,
            default: true
        },
        showCancelBtn: {
            type: Boolean,
            default: true
        },
        confirmBtnText: {
            type: String,
            default: '确定'
        },
        cancelBtnText: {
            type: String,
            default: '取消'
        },
        callBack: Function
    }
}
</script>

<style lang="scss" scoped>
  .confirm-wrapper {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background:rgba(35,36,40,0.30);
  }
  .confirm-box {
    width: 80%;
    border-radius: 4px;
    font-size: 16px;
    overflow: hidden;
    background-color: #fbfdff;
    .confirm-header {
      font-size: 18px;
      padding: 18px 0 14px;
      text-align: center;
      color: #333333;
    }
    .confirm-body {
      padding: 0 18px 10px;
    }
    .confirm-footer {
      display: flex;
      border-top: 1px solid #e1e1e1;
      text-align: center;
      line-height: 44px;
      button {
        flex: 1;
        &.cancel-btn {
          border-right: 1px solid #e1e1e1;
        }
        &.confirm-btn {
          color: #26a2ff;
        }
      }
    }
  }
  // 添加动画效果
  .confirm-bounce-enter-active, .confirm-bounce-leave-active {
    transition: all 0.3s ease;
  }
  .confirm-bounce-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  .confirm-bounce-leave-active {
    opacity: 0;
    transform: scale(0.8);
  }
</style>
