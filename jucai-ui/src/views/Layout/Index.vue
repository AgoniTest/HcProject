<template>
    <div class="layout">
      <!-- 头部 -->
      <HeadBar></HeadBar>
      <!-- 左侧菜单 -->
      <NavBar></NavBar>
      <!-- 内容 -->
      <Content></Content>
    </div>
</template>

<script>
import HeadBar from '../HeadBar'
import NavBar from "../NavBar"
import Content from './Content'
export default {
    components:{
      HeadBar,NavBar,Content
    }
}
</script>

<style lang="scss" scoped>
.layout{
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}
</style>