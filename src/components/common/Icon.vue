<template>
  <svg :class="iconClassName" :style="{color: this.color}">
    <use :xlink:href="'/static/icon-symbol.svg#' + type"></use>
  </svg>
</template>
<script>
export default {
    name: 'icon',
    computed: {
        iconClassName () {
            return ['icon', `icon-${this.size}`, `icon-${this.type}`]
        }
    },
    props: {
        type: {
            required: true,
            type: String,
            validator (value) {
                return ['wechat', 'QQ', 'weibo'].indexOf(value) !== -1
            }
        },
        size: {
            type: String,
            default: 'medium',
            validator (value) {
                return ['small', 'medium', 'large'].indexOf(value) !== -1
            }
        },
        color: {
            type: String,
            default: '#cccccc'
        }
    }
}
</script>
<style lang="scss">
.icon {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
  &.icon-small {
    width: 20px;
    height: 20px;
  }
  &.icon-medium {
    width: 24px;
    height: 24px;
  }
  &.icon-large {
    width: 28px;
    height: 28px;
  }
}
</style>
