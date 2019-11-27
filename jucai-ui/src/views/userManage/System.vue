<template>
      <div class="home">
      <div class="home-body">
      <h4 class="title">HC互联网端</h4>
      <p class="des">版本:0.1.0</p>
      <p class="des">深圳聚才项目管理有限公司®版权所有</p>
    </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../../../static/img/背景.jpg) no-repeat;
  background-size: 100% 100%;
  .home-body {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    text-align: center;
    padding: 100px;
    box-sizing: border-box;
    .title {
      font-size: 32px;
      font-weight: bold;
      line-height: 60px;
    }
    .des {
      font-size: 18px;
      margin: 20px 0;
    }
  }
}
</style>