<template>
  <div>
    <h1>icon 列表</h1>
    <h3>三种尺寸的 icon </h3>
    <ul class="icon-list">
      <li>
        <icon type="QQ" size="small" />
        <p>small</p>
      </li>
      <li>
        <icon type="QQ" />
        <p>medium</p>
      </li>
      <li>
        <icon type="QQ" size="large" />
        <p>large</p>
      </li>
    </ul>
    <h3>设置 icon 颜色</h3>
    <div class="wechat-icon-wrap">
      <icon type="wechat" color="red" />
      <p> icon </p>
    </div>
  </div>
</template>
<script>
import Icon from './common/Icon.vue'

export default {
    name: 'UseIcon',
    components: {
        Icon
    }
}
</script>

<style lang="scss" scoped>
.icon-list {
  display: flex;
  padding: 5px 0;
  li {
    flex: 1;
    text-align: center;
  }
}
.wechat-icon-wrap {
  padding-top: 10px;
}
</style>
