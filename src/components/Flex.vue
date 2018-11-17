<template>
  <div>
    <h2>由 bootstrap media 组件谈 flex</h2>
    <h3>1. 基本用法</h3>
    <div class="media media1">
      <img class="media-left media-pic" src="../assets/logo.png" />
      <div class="media-body">
        body
      </div>
      <div class="media-right">
        right
      </div>
    </div>
    <h3>2. 常见的使用居中的情景</h3>
    <div class="media media2-1 vertical-container">
      <p>简单的垂直居中布局的方法</p>
    </div>
    <div class="media media2-2">
      <img class="media-left media-pic align-self-center" src="../assets/logo.png" />
      <div class="media-body">
        图片居中
      </div>
    </div>
    <h3>3. flex属性的一些细节</h3>
    <h4>3.1 flex-shrink</h4>
    <div class="media media3 media3-1">
      <div class="box">box1</div>
      <div class="box">box2</div>
      <div class="box">box3</div>
      <div class="box">box4</div>
    </div>
    <h4>3.2 flex-wrap</h4>
    <div class="media media3 media3-2">
      <div class="box">box1</div>
      <div class="box">box2</div>
      <div class="box">box3</div>
      <div class="box">box4</div>
    </div>
    <h4>3.3 当使用 text-overflow: ellipsis; </h4>
    <h4>情形-1</h4>
    <div class="media media3 media3-3">
      <img class="media-left media-pic" src="../assets/logo.png" />
      <div class="media-body text-overflow">
        Vue.js (读音 /vjuː/，类似于 view) 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。
      </div>
      <div class="media-right"></div>
    </div>
    <h4>情形-2</h4>
    <div class="media media3 media3-3">
      <img class="media-left media-pic" src="../assets/logo.png" />
      <div class="media-body">
        <p class="text-overflow">Vue.js (读音 /vjuː/，类似于 view) 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。</p>
      </div>
      <div class="media-right"></div>
    </div>
    <h4>解决方案是media-body的宽度</h4>
    <div class="media media3 media3-3">
      <img class="media-left media-pic" src="../assets/logo.png" />
      <div class="media-body media-body--special">
        <p class="text-overflow">Vue.js (读音 /vjuː/，类似于 view) 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。</p>
      </div>
      <div class="media-right"></div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Flex'
}
</script>

<style lang="scss" scoped>
  .media {
    display: flex;
    background-color: #f8f8f8;
  }
  .media-pic {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .align-self-center {
    align-self: center;
  }
  // media object
  .media1 {
    .media-body {
      flex: 1 1 230px;
      background-color: #b1b1b1;
    }
    .media-right {
      width: 50px;
    }
  }
  .media2-1 {
    height: 80px;
    align-items: center;
    justify-content: center;
    p {
      width: 200px;
      padding: 5px;
      background-color: #b1b1b1;
    }
  }
  .media2-2 {
    height: 80px;
    margin-top: 10px;
  }
  .media3 {
    .box {
      height: 80px;
      width: 100px;
      background-color: #b1b1b1;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .media3-1 {
    overflow-y: scroll;
    .box {
      flex-shrink: 0;
    }
  }
  .media3-2 {
    margin-top: 10px;
    flex-wrap: wrap;
    .box {
      flex-shrink: 0;
    }
  }
  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  // 解决方案参考: https://css-tricks.com/flexbox-truncated-text/
  // https://stackoverflow.com/questions/26465745/ellipsis-in-flexbox-container
  .media3-3 {
    .media-right {
      width: 50px;
      background-color: #b1b1b1;
    }
    .media-body {
      flex: 1;
    }
    .media-body--special {
      min-width: 0;
      // flex-basis: 50%;
    }
  }
</style>
