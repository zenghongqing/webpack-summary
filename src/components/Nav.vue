<template>
  <div>
    <h2>案例导航列表</h2>
    <ul class="nav-list">
      <li>
        <router-link to="/line-height">
          1. vertical-align 与 line-height 之间的关系
        </router-link>
      </li>
      <li>
        <router-link to="/flex">
          2. 由 bootstrap media 组件谈 flex
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'Nav'
}
</script>
