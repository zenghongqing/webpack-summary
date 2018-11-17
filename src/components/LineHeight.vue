<template>
  <div>
    <h2>line-height 与 vertical-align 的测试</h2>
    <p class="example">
      line-height: 26px
      <span>16px</span>
      <span>20px</span>
    </p>
  </div>
</template>

<script>
export default {
    name: 'LineHeight'
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
